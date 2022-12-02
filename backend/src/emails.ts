// emails.ts
// Implements API for transmitted email objects.

import { Application } from "express";
import moment = require("moment");

import db from "./db";
import { Email } from "./types";

/**
 * Date format string for moment.format(). Documentation:
 * https://momentjs.com/docs/#/displaying/format/
 */
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

/** Schema of a row from the Email table of our database.  */
interface EmailRow {
    EmailID: number
    Subject: string | null
    Body: string | null
    SenderAddress: string
    ReceiverAddresses: string
    Timestamp: string
}


/**
 * Brute force type and and value validator to check if a request's body matches
 * the Email interface. Return a message describing what was the first
 * violation detected, or null if param body is valid.
 */
function findEmailError(body: any): string | null {
    if (typeof body !== "object")
        return `body must be a JSON object`;

    // Validate sender
    if (typeof body.from !== "string")
        return `'from' must be a string`;

    // Validate recipients
    if (!Array.isArray(body.to))
        return `'to' must be an array of strings`;
    if (!body.to.every(item => typeof item === "string"))
        return `'to' must be an array of strings`;

    // Validate subject line
    if (body.subject !== null && typeof body.subject !== "string")
        return `'subject' must be either null or a string`;

    // Validate email body text
    if (body.text !== null && typeof body.text !== "string")
        return `'body' must be either null or a string`;

    return null;
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
        getSentEmails(address, (resp): void => {
            res.status(resp.code).json(resp);
        });
    });
    server.get("/all-received-emails", (req, res) => {
        const { address } = req.query;
        if (!address || typeof address !== 'string') {
            return res.status(400).json({ code: 400, message: "No address supplied" });
        }
        getReceivedEmails(address, (resp): void => {
            res.status(resp.code).json(resp);
        });
    });
    server.post("/email", (req, res) => {
        const errorMsg = findEmailError(req.body);
        if (errorMsg === null) {
            storeEmail(req.body as Email, (resp): void => {
                res.status(resp.code).json(resp);
            });
        }
        else {
            return res.status(400).json({
                code: 400,
                message: `Body does not conform with shape of Email interface: ${errorMsg}`
            });
        }
    });
}


/**
 * Helper function for converting a row representing an Email object retrieved
 * from the database to an Email object ready to be transmitted via endpoints.
 */
function rowToEmail(row: EmailRow): Email {
    return {
        from: row.SenderAddress,
        to: row.ReceiverAddresses.split(","),
        subject: row.Subject,
        text: row.Body,
        timestamp: row.Timestamp
    };
}


/**
 * Given some email address, populate the response with an array of email
 * objects representing all that address' sent emails.
 */
function getSentEmails(
    address: string,
    callback: (resp) => void
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
            const emails = rows.map(rowToEmail);

            // Populate response with an array of Email models
            return callback({
                code: 200,
                emails: emails
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
    callback: (resp) => void
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
            const emails = rows.map(rowToEmail);

            // Populate response with an array of Email models
            return callback({
                code: 200,
                emails: emails
            });
        }
    );
}


/**
 * Given an email object, add it to the Email table. The email object does not
 * need to have the timestamp attribute because the function will overwrite it
 * with the current timestamp before inserting into database.
 */
function storeEmail(
    email: Email,
    callback: (resp) => void
): void {

    // Generate the timestamp at the time of call.
    // That way, it's not the front-end's responsibility to pass in a timestamp.
    email.timestamp = moment().format(DATE_FORMAT);;
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
                message: `Stored email from ${email.from} to ${email.to}, sent at ${email.timestamp}`
            });
        }
    );
}
