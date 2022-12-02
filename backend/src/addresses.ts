// addresses.ts
// Implements API for user-owned email addresses.

import express = require("express");

import db from './db';


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
        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ code: 400, message: "No email supplied" });
        }
        getAddresses(email, (resp) => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/address", (req, res) => {
        const { email, address } = req.body;
        if (!email) {
            return res.status(400).json({ code: 400, message: "No email supplied " });
        }
        if (!address) {
            return res.status(400).json({ code: 400, message: "No address to add supplied " });
        }
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
    callback: (resp) => void
): void {

    // First verify that the user is registered
    verifyUserRegistered(email, (exists: boolean): void => {
        if (!exists) {
            return callback({
                code: 400,
                message: `No user registered with email address ${email}!`
            });
        }

        // Then get the addresses that are owned by that email
        db.all("SELECT EmailAddress FROM Address WHERE UserEmail = ?", [email],
            (err: Error, rows: Array<{ EmailAddress: string }>) => {
                if (err) {
                    return callback({
                        code: 500,
                        message: `Error occurred trying to retrieve `
                            + `owned addresses for user ${email}.`
                    });
                }

                // Populate response with an array of email address strings
                return callback({
                    code: 200,
                    addresses: rows.map(row => row.EmailAddress)
                });
            }
        );
    });
}


/**
 * Given a user's email address, register the given email address as owned by
 * this user if that address is available, or return an error otherwise.
 */
function addAddress(
    email: string,
    address: string,
    callback: (resp) => void
): void {

    // First verify that the user is registered
    verifyUserRegistered(email, (exists: boolean): void => {
        if (!exists) {
            return callback({
                code: 400,
                message: `No user registered with email address ${email}!`
            });
        }

        // Then add an entry to the Address table referencing that email
        db.run(
            "INSERT INTO Address (EmailAddress, UserEmail) VALUES (?, ?)",
            [address, email],
            (err: Error) => {
                if (err) {
                    // Address already taken
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
                        message: err.message
                    });
                }
                // Success
                return callback({
                    code: 200,
                    message: `Added ${address} to user ${email}'s list`
                });
            }
        );
    });
}


/**
 * Helper function for first verifying that a user is registered with our client
 * by checking if their email is in our Users table, then calling the param
 * callback with whether the user exists. If there was some error in the
 * database operation, callback is called with false.
 */
export function verifyUserRegistered(
    email: string,
    callback: (exists: boolean) => void
): void {
    db.get("SELECT * FROM Users WHERE email = ?", [email],
        (err: Error, row: any[] | undefined): void => {
            if (err || row === undefined)
                return callback(false);
            return callback(true);
        }
    );
}
