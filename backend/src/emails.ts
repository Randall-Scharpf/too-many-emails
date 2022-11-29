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
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({ code: 400, message: "No address supplied " });
        }
        getSentEmails(address, (resp: Response): void => {
            res.status(resp.code).json(resp);
        });
    });
    server.get("/all-received-emails", (req, res) => {
        // TODO: Verify that the incoming req.body.address exists.
        // Then call getReceivedEmails().
    });
    server.post("/email", (req, res) => {
        // TODO: Validate that the incoming req.body has the shape of an Email.
        // Then call storeEmail().
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
 * objects representing all that address' received emails.
 */
function getReceivedEmails(
    address: string,
    callback: (resp: Response) => void
): void {

    // TODO.
}


/**
 * Given an email object, add it to the Email table and update the Transmission
 * table respectively based on its sender, receivers, CCs, BCCs, etc.
 */
function storeEmail(
    email: Email,
    callback: (resp: Response) => void
): void {

    // TODO.
}
