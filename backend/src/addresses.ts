// addresses.ts
// Implements API for user-owned email addresses.

import express = require("express");

import db from './db';

/** Represents an HTTP response to populate and send back via res.  */
interface Response {
    /** HTTP status code.  */
    code: number,
    /** Error message for bad requests.  */
    message?: string
    /** Requested JSON content for fulfilled requests.  */
    json?: object
}


/**
 * Register backend endpoints email address-related operations.
 *
 * These endpoints are:
 *
 *      GET    /all-addresses   Get all addresses of the user.
 *      POST   /address         Add a new address under the user.
 */
export function initAddressEndpoints(server: express.Application): void {
    server.get("/all-addresses", (req, res) => {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ code: 400, message: "No email supplied" });
        }
        getAddresses(email, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/address", (req, res) => {
        addAddress(req.body.email, req.body.address, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
}


/**
 * Given a user's email address, get all of their email addresses registered
 * with our application.
 */
function getAddresses(
    email: string,
    callback: (resp: Response) => void
): void {

    // First get the UserID from email address
    db.get("SELECT UserID FROM Users WHERE email = ?",
        [email],
        (err: Error, row: { UserID: number }): void => {
            if (err || !row) {
                return callback({
                    code: 400,
                    message: `No user registered with email address ${email}!`
                });

            } else {
                // Use the UserID to get all Addresses referencing that ID
                db.all("SELECT EmailAddress FROM Address WHERE UserId = ?",
                    [row.UserID],
                    (err: Error, rows: Array<{ EmailAddress: string }>) => {
                        if (err) {
                            return callback({
                                code: 500,
                                message: `Error occurred trying to retrieve `
                                    + `owned addresses for user ${email}.`
                            });
                        }

                        // Respond with an array of email address strings
                        return callback({
                            code: 200,
                            json: rows.map(row => row.EmailAddress)
                        });
                    }
                );
            }
        }
    );
}


/**
 * Given a user's email address, register the given email address as owned by
 * this user if that address is available, or return an error otherwise.
 */
function addAddress(
    email: string,
    address: string,
    callback: (resp: Response) => void
): void {

    // First get the UserID from email address
    db.get("SELECT UserID FROM Users WHERE email = ?",
        [email],
        (err: Error, row: { UserID: number }): void => {
            if (err || !row) {
                return callback({
                    code: 400,
                    message: `No user registered with email address ${email}!`
                });
            } else {
                // Add an entry to Address table referencing that UserID
                db.run(
                    "INSERT INTO Address (EmailAddress, UserID) VALUES (?, ?)",
                    [address, row.UserID],
                    (err: Error) => {
                        if (err) {
                            // Already registered
                            if (err.message.includes("UNIQUE constraint failed")) {
                                const message = `${address} already taken!`;
                                console.error(message);
                                return callback({
                                    code: 400,
                                    message: message
                                })
                            }
                            // Some other error
                            console.error(err.message);
                            return callback({
                                code: 500,
                                message: `Could not add ${address}.`
                            });
                        }
                        // Success
                        return callback({
                            code: 200,
                            json: {}
                        });
                    }
                );
            }
        }
    );
}
