// mhm, doing your own authentication is a bad idea
// but what if i only run on localhost and never reuse passwords
// bet you didn't think about that one, checkmate, i'm the MVP
// where MVP = minimum viable prototype lol

import crypto = require("node:crypto");

import express = require("express");

import db from "./db";


/**
 * Register backend endpoints for authentication-related operations.
 *
 * These endpoints are:
 *
 *      /create-user
 *      /login-user
 *      /logout-user
 *      /change-password
 *      /logout-all-users <-- ADDED THIS TO STOP 'already logged in' ERRORS
 */
export function initAuthEndpoints(server: express.Application): void {
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
    server.post("/logout-all-users", (req, res) => {
        logoutAllUsers((resp) => {
            res.status(resp.code).json(resp);
        });
    });
}

async function makeHash(param: string) {
    let N = 16384 * 8;
    let x = crypto.scryptSync("", param, 256, { N: N, r: 8, p: 1, maxmem: 256 * N * 8 }).toString();
    return x;
}

function makeRandom(length: number, binaryString: boolean): string {
    var salt = "";
    for (var v = 0; v < length; v++) {
        let b = crypto.randomInt(0, 256);
        salt += binaryString ? String.fromCharCode(b) : b.toString(16).padStart(2, '0');
    }
    return salt;
}

async function dbSetUserPassword(email, pw, callback: (param: { code: number, message: string }) => void) {
    var salt = makeRandom(16, true);
    let pwhash = await makeHash(pw + salt);
    db.run("DELETE FROM Users WHERE email = ?", [email]);
    db.run("INSERT INTO Users (email, pwhash, salt) VALUES (?, ?, ?)", [email, pwhash, salt]);
    callback({ code: 200, message: "Success" });
}

function addUser(email: string, pw: string, callback: (param: { code: number, message: string }) => void) {
    db.all("SELECT * FROM Users WHERE email = ?", [email], async (err, rows) => {
        if (rows.length > 0) {
            callback({ code: 400, message: "Email already has an account!" });
        } else {
            dbSetUserPassword(email, pw, callback);
        }
    });
}

function loginUser(email: string, pw: string, callback: (param: { code: number, token: string }) => void) {
    let EXPIRY_MILLIS = 12 * 60 * 60 * 1000;
    db.all("SELECT * FROM Tokens WHERE email = ?", [email], async (err, rows) => {
        if (rows.length !== 0 && (rows[0].expiry > Date.now())) {
            callback({ code: 400, token: "Already logged in!" });
        } else {
            db.run("DELETE FROM Tokens WHERE email = ?", [email]);
            db.all("SELECT * FROM Users WHERE email = ?", [email], async (err, rows) => {
                if (rows.length === 0) {
                    callback({ code: 400, token: "Email/Password combination invalid!" });
                } else {
                    let pwhash = await makeHash(pw + rows[0].salt);
                    if (pwhash !== rows[0].pwhash) {
                        callback({ code: 400, token: "Email/Password combination invalid!" });
                        return;
                    }
                    var token = makeRandom(64, false);
                    db.run("INSERT INTO Tokens (email, token, expiry) VALUES (?, ?, ?)", [email, token, Date.now() + EXPIRY_MILLIS]);
                    callback({ code: 200, token: token });
                }
            });
        }
    });
}

function logoutUser(email: string, token: string, callback: (param: { code: number, message: string }) => void) {
    verifyToken(email, token, (resp) => {
        if (!resp) {
            db.run("DELETE FROM Tokens WHERE email = ?", [email]);
            resp = { code: 200, message: "Logged out of " + email };
        }
        callback(resp);
    });
}

function setPassword(email: string, token: string, password: string, callback: (param: { code: number, message: string }) => void) {
    verifyToken(email, token, (resp) => {
        if (resp) {
            callback(resp);
        }
        else {
            dbSetUserPassword(email, password, callback);
        }
    });
}

function logoutAllUsers(callback: (resp: { code: number, message: string }) => void): void {
    db.run("DELETE FROM Tokens;", (err: Error) => {
        if (err) {
            callback({
                code: 500,
                message: "An error occurred trying to log out all users"
            })
        } else {
            callback({
                code: 200,
                message: "Successfully logged out all users"
            })
        }
    });
}

/**
 * Verify a token associated with a particular email.
 */
export function verifyToken(email: string, token: string, callback: (param: { code: number, message: string } | undefined) => void) {
    db.all("SELECT * FROM Tokens WHERE email = ?", [email], async (err, rows) => {
        if (rows.length === 0) {
            callback({ code: 400, message: "Invalid token!" });
        } else {
            if (token !== rows[0].token || rows[0].expiry < Date.now()) {
                callback({ code: 400, message: "Invalid token!" });
            } else {
                callback(undefined);
            }
        }
    });
}
