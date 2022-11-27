// addresses.ts
// Implements API for user-owned email addresses.

import express = require("express");

import db from './db';

/** Represents an HTTP response to populate and send back via res.  */
interface Response {
    /** HTTP status code.  */
    code: number,
    /** Error message for bad requests.  */
    message: string | null
    /** Requested JSON content for fulfilled requests.  */
    json: object | null
}

db; // Temp so that auto-formatter doesn't remove import lien


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
        getAddresses(req.body.email, (resp) => {
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

    // TODO.
}


/**
 * Given a user's email address, register the given email address as owned by
 * this user if that address is available, or return an error otherwise.
 */
function addAddress(
    email: string,
    addAddress: string,
    callback: (resp: Response) => void
): void {

    // TODO.
}
