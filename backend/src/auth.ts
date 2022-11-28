// mhm, doing your own authentication is a bad idea
// but what if i only run on localhost and never reuse passwords
// bet you didn't think about that one, checkmate, i'm the MVP
// where MVP = minimum viable prototype lol

let auth_db;
import crypto from 'crypto'

export function initAuthDb(db, maketables : boolean) {
    if (maketables) {
        db.run(
            "CREATE TABLE Users (email TEXT, salt TEXT, pwhash TEXT)"
        );
        db.run(
            "CREATE TABLE Tokens (email TEXT, token TEXT, expiry INTEGER)"
        );
    }
    auth_db = db;
}

export function initAuthEndpoints(server) {
    server.post("/create-user", (req, res) => {
        addUser(req.body.email, req.body.pw, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/login-user", (req, res) => {
        loginUser(req.body.email, req.body.pw, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/logout-user", (req, res) => {
        logoutUser(req.body.email, req.body.token, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/change-password", (req, res) => {
        setPassword(req.body.email, req.body.token, req.body.pw, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
}

async function makeHash(param: string) {
    let N = 16384*8;
    let x = crypto.scryptSync("", param, 256, { N: N, r: 8, p: 1, maxmem: 256*N*8 }).toString();
    return x;
}

function makeRandom(length: number, binaryString: boolean) : string {
    var salt = "";
    for (var v = 0; v < length; v++) {
        let b = crypto.randomInt(0, 256);
        salt += binaryString ? String.fromCharCode(b) : b.toString(16).padStart(2, '0');
    }
    return salt;
}

async function dbSetUserPassword(email, pw, callback: (param: {code: number, message: string}) => void) {
    var salt = makeRandom(16, true);
    let pwhash = await makeHash(pw + salt);
    auth_db.run("DELETE FROM Users WHERE email = ?", [email]);
    auth_db.run("INSERT INTO Users VALUES (?, ?, ?)", [email, salt, pwhash]);
    callback({code: 200, message: "Success"});
}

function addUser(email: string, pw: string, callback: (param: {code: number, message: string}) => void) {
    auth_db.all("SELECT * FROM Users WHERE email = ?", [email], async (err, rows) => {
        if (rows.length > 0) {
            callback({code: 400, message: "Email already has an account!"});
        } else {
            dbSetUserPassword(email, pw, callback);
        }
    });
}

function loginUser(email: string, pw: string, callback: (param: {code: number, token: string}) => void) {
    let EXPIRY_MILLIS = 12*60*60*1000;
    auth_db.all("SELECT * FROM Tokens WHERE email = ?", [email], async (err, rows) => {
        if (rows.length !== 0 && (rows[0].expiry > Date.now())) {
            callback({code: 400, token: "Already logged in!"});
        } else {
            auth_db.run("DELETE FROM Tokens WHERE email = ?", [email]);
            auth_db.all("SELECT * FROM Users WHERE email = ?", [email], async (err, rows) => {
                if (rows.length === 0) {
                    callback({code: 400, token: "Email/Password combination invalid!"});
                } else {
                    let pwhash = await makeHash(pw + rows[0].salt);
                    if (pwhash !== rows[0].pwhash) {
                        callback({code: 400, token: "Email/Password combination invalid!"});
                        return;
                    }
                    var token = makeRandom(64, false);
                    auth_db.run("INSERT INTO Tokens VALUES (?, ?, ?)", [email, token, Date.now() + EXPIRY_MILLIS]);
                    callback({code: 200, token: token});
                }
            });
        }
    });
}

function logoutUser(email: string, token: string, callback: (param: {code: number, message: string}) => void) {
    verifyToken(email, token, (resp) => {
        if (!resp) {
            auth_db.run("DELETE FROM Tokens WHERE email = ?", [email]);
            resp = {code: 200, message: "Logged out of " + email};
        }
        callback(resp);
    });
}

function setPassword(email: string, token: string, password: string, callback: (param: {code: number, message: string}) => void) {
    verifyToken(email, token, (resp) => {
        if (resp) {
            callback(resp);
        }
        else {
            dbSetUserPassword(email, password, callback);
        }
    });
}

export function verifyToken(email: string, token: string, callback: (param: {code: number, message: string} | undefined) => void) {
    auth_db.all("SELECT * FROM Tokens WHERE email = ?", [email], async (err, rows) => {
        if (rows.length === 0) {
            callback({code: 400, message: "Invalid token!"});
        } else {
            if (token !== rows[0].token || rows[0].expiry < Date.now()) {
                callback({code: 400, message: "Invalid token!"});
            } else {
                callback(undefined);
            }
        }
    });
}
