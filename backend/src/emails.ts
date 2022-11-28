// emails.ts
// Implements API for transmitted email objects.

import { Application } from "express";

import { getUserID } from "./addresses";
import db from "./db";
import { Email, Response } from "./types";

db; // Temporary line so that auto-formatter doesn't remove the import line


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
        // TODO: Verify that the incoming req.body.address exists.
        // Then call getSentEmails().
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
    // First get the User ID
    getUserID(address, (UserID: number | null): void => {
        if (UserID === null) {
            callback({
                code: 400,
                message: `No email address found that matches ${address}.`
            });
        }

        // Then get all emails with that ID as sender
        else {
            // TODO: Working on new Transmission DB table first to model the
            // many-to-many relationship of senders and receivers.
        }
    });
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
