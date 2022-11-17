// mhm, doing your own authentication is a bad idea
// but what if i only run on localhost and never reuse passwords
// bet you didn't think about that one, checkmate, i'm the MVP
// where MVP = minimum viable prototype lol

let auth_db;
let crypto = require('node:crypto');

export function initAuthDb(db, maketables : boolean) {
    if (maketables) {
        db.run(
            "CREATE TABLE Users (email TEXT, salt TEXT, pwhash TEXT)"
        );
        db.run(
            "CREATE TABLE Tokens (email TEXT, salt TEXT, tokenhash TEXT)"
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
}

async function sha_256(param: string) {
    const msgBuffer = new TextEncoder().encode(param);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => String.fromCharCode(b)).join('');
    return hashHex;
}

function makeRandom(length: number) : string {
    var salt = "";
    for (var v = 0; v < length; v++) salt += String.fromCharCode(crypto.randomInt(0, 256));
    return salt;
}

function addUser(email: string, pw: string, callback: (param: {code: number, deets: string}) => void) {
    auth_db.all("SELECT * FROM Users WHERE email = ?", [email], async (err, rows) => {
        // console.log(rows);
        if (rows.length > 0) {
            callback({code: 400, deets: "Email already has an account!"});
        } else {
            var salt = makeRandom(8);
            let pwhash = await sha_256(pw + salt);
            auth_db.run("INSERT INTO Users VALUES (?, ?, ?)", [email, salt, pwhash]);
            callback({code: 200, deets: "Success"});
        }
    });
}

function loginUser(email: string, pw: string, callback: (param: {code: number, deets: string}) => void) {
    auth_db.all("SELECT * FROM Users WHERE email = ?", [email], async (err, rows) => {
        console.log(rows);
        if (rows.length === 0) {
            callback({code: 400, deets: "Email/Password combination invalid!"});
        } else {
            let pwhash = await sha_256(pw + rows[0].salt);
            console.log(pwhash);
            if (pwhash !== rows[0].pwhash) {
                callback({code: 400, deets: "Email/Password combination invalid!"});
                return;
            }
            var token = makeRandom(24);
            var salt = makeRandom(8);
            let tokenhash = await sha_256(token + salt);
            auth_db.run("INSERT INTO Tokens VALUES (?, ?, ?)", [email, salt, tokenhash]);
            callback({code: 200, deets: token});
        }
    });
}

export function logoutUser(email: string, token: string, callback: (param: {code: number, deets: string}) => void) {
    verifyToken(email, token, (resp) => {
        if (!resp) {
            auth_db.run("DELETE FROM Tokens WHERE email = ?", [email]);
            resp = {code: 200, deets: "Logged out of " + email};
        }
        callback(resp);
    });
}

export function verifyToken(email: string, token: string, callback: (param: {code: number, deets: string} | undefined) => void) {
    auth_db.all("SELECT * FROM Tokens WHERE email = ?", [email], async (err, rows) => {
        if (rows.length === 0) {
            callback({code: 400, deets: "Invalid token!"});
        } else {
            let tokenhash = await sha_256(token + rows[0].salt);
            if (tokenhash !== rows[0].tokenhash) {
                callback({code: 400, deets: "Invalid token!"});
            } else {
                callback(undefined);
            }
        }
    });
}
