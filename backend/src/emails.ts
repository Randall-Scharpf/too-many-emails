// emails.ts
// Implements API for transmitted email objects.

import { Application } from "express";

import db from "./db";
import { Email, Response } from "./types";

/** Schema of a row from the Email table of our database.  */
interface EmailRow {
    EmailID: number
    Subject: string | null
    Body: string | null
    SenderAddress: string
    ReceiverAddresses: string
    Timestamp: number
}


/**
 * Brute force type and and value validator to check if a request's body matches
 * the Email interface.
 */
function validateEmail(body: any): boolean {
    if (typeof body !== "object")
        return false;
    // Validate sender
    if (typeof body.from !== "string")
        return false;
    // Validate recipients
    if (!Array.isArray(body.to))
        return false;
    if (!body.to.every(item => typeof item === "string"))
        return false;
    // Validate subject line
    if (body.subject !== null && typeof body.subject !== "string")
        return false;
    // Validate email body text
    if (body.text !== null && typeof body.text !== "string")
        return false;
    return true;
}


/**
 * Register backend endpoints for email object related operations.
 *
 * These endpoints are:
 *
 *      GET     /all-sent-emails        Get all email sent by address.
 *      GET     /all-received-emails    Get all emails received by address.
 *      POST    /email                  Add a sent email to the database.
 */
export function initEmailEndpoints(server: Application): void {
    server.get("/all-sent-emails", (req, res) => {
        const { address } = req.query;
        if (!address || typeof address !== 'string') {
            return res.status(400).json({ code: 400, message: "No address supplied" });
        }
        getSentEmails(address, (resp: Response): void => {
            res.status(resp.code).json(resp);
        });
    });
    server.get("/all-received-emails", (req, res) => {
        const { address } = req.query;
        if (!address || typeof address !== 'string') {
            return res.status(400).json({ code: 400, message: "No address supplied" });
        }
        getReceivedEmails(address, (resp: Response): void => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/email", (req, res) => {
        if (!validateEmail(req.body)) {
            return res.status(400).json({ code: 400, message: "Body does not conform with shape of Email interface" });
        }
        storeEmail(req.body as Email, (resp: Response): void => {
            res.status(resp.code).json(resp);
        });
    });
}


/**
 * Given some email address, populate the response with an array of email
 * objects representing all that address' sent emails.
 */
function getSentEmails(
    address: string,
    callback: (resp: Response) => void
): void {

    db.all("SELECT * FROM Email WHERE SenderAddress = ?", [address],
        (err: Error, rows: EmailRow[]): void => {
            if (err) {
                console.error(err.message);
                return callback(
                    {
                        code: 500,
                        message: `Couldn't retrieve sent emails for address ${address}`
                    }
                );
            }

            // Convert EmailRow[] to Email[]
            const emails = rows.map(row => {
                return {
                    from: row.SenderAddress,
                    to: row.ReceiverAddresses.split(","),
                    subject: row.Subject,
                    text: row.Body
                } as Email
            })

            // Populate response with an array of Email models
            return callback({
                code: 200,
                json: emails
            });
        }
    );
}


/**
 * Given some email address, populate the response with an array of email
 * objects representing all the emails for which the address is or one of the
 * recipients.
 */
function getReceivedEmails(
    address: string,
    callback: (resp: Response) => void
): void {

    // Copy-paste go brrr
    // Except oops, gotta pattern match this time
    db.all("SELECT * FROM Email WHERE ReceiverAddresses LIKE ?", [`%${address}%`],
        (err: Error, rows: EmailRow[]): void => {
            if (err) {
                console.error(err.message);
                return callback(
                    {
                        code: 500,
                        message: `Couldn't retrieve received emails for address ${address}`
                    }
                );
            }

            // Convert EmailRow[] to Email[]
            const emails = rows.map(row => {
                return {
                    from: row.SenderAddress,
                    to: row.ReceiverAddresses.split(","),
                    subject: row.Subject,
                    text: row.Body
                } as Email
            })

            // Populate response with an array of Email models
            return callback({
                code: 200,
                json: emails
            });
        }
    );
}


/**
 * Given an email object, add it to the Email table and update the Transmission
 * table respectively based on its sender, receivers, CCs, BCCs, etc.
 */
function storeEmail(
    email: Email,
    callback: (resp: Response) => void
): void {

    db.run(
        "INSERT INTO Email (Subject, Body, SenderAddress, ReceiverAddresses) VALUES (?, ?, ?, ?)",
        [email.subject || null, email.text || null, email.from, email.to.join(",")],
        (err: Error) => {
            if (err) {
                console.error(err.message);
                return callback({
                    code: 500,
                    message: err.message
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
