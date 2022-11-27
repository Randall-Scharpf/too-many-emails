// db.ts
// Handler for database operations.

import fs = require("node:fs");

import sqlite3 = require("sqlite3");


const DB_FILE = "./.data/sqlite.db";
const SCHEMA_FILE = "./db-schema.sql"

/** SQLite3 database client instance.  */
const db = new (sqlite3.verbose()).Database(DB_FILE);
export default db;

// Ensure paths
const exists = fs.existsSync(DB_FILE);
if (!fs.existsSync("./.data")) {
    fs.mkdirSync("./.data");
}
if (!exists) {
    fs.openSync(DB_FILE, 'w');
}

/**
 * Initialize database by executing the contents of the db-schema.sql file to
 * create the tables.  Does nothing if the database file already exists.
 */
export function initDB(): void {
    // Execute schema if it's a fresh DB file
    if (!exists) {
        console.log(`${DB_FILE} is a new file, running ${SCHEMA_FILE}...`);
        const schema = fs.readFileSync(SCHEMA_FILE).toString();
        db.exec(schema, (err: Error): void => {
            err
                ? console.error(err.message)
                : console.log(`Successfully initialized ${DB_FILE}.`);
        });
    } else {
        console.log(`${DB_FILE} already existed, not creating tables.`);
    }
}


// TODO: not sure what to do with these:

export function writeKv(key: string, value: string): void {
    db.run("DELETE FROM KeyValue WHERE key = ?", [key]);
    db.run("INSERT INTO KeyValue VALUES (?, ?)", [key, value]);
}

export function readKv(key: string, callback: (val: string | undefined, err: string | undefined) => void): void {
    db.all("SELECT * FROM KeyValue WHERE key = ?", [key], (err: string, rows) => {
        if (rows.length > 0) {
            callback(rows[0].value, undefined);
        } else {
            callback(undefined, err);
        }
    });
}
