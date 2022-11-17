// db.ts
// Handler for database operators.

import * as fs from 'node:fs';
import * as sqlite3 from 'sqlite3';
import { getLog } from './logging';

const log = getLog(__filename);
const DB_FILE = process.env.DB_FILE || "./.data/sqlite.db";

const exists = fs.existsSync(DB_FILE);

/* Ensure paths */
if (!fs.existsSync("./.data")) {
    fs.mkdirSync("./.data");
}
if (!exists) {
    fs.openSync(DB_FILE, 'w');
}
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(DB_FILE);

db.serialize(() => {
    if (!exists) {
        db.run(
            "CREATE TABLE KeyValue (key TEXT, value TEXT)"
        );
        log("New table KeyValue created!");
    }
    require("./auth").initAuthDb(db, !exists);
});

db.each("SELECT * FROM KeyValue", (err, row) => {
    log(row);
});

export function writeKv(key: string, value: string) : void {
    db.run("DELETE FROM KeyValue WHERE key = ?", [key]);
    db.run("INSERT INTO KeyValue VALUES (?, ?)", [key, value]);
}

export function readKv(key: string, callback: (val: string | undefined, err: string | undefined) => void): void {
    db.all("SELECT * FROM KeyValue WHERE key = ?", [key], (err: string, rows) => {
        log(rows);
        if (rows.length > 0) {
            callback(rows[0].value, undefined);
        } else {
            callback(undefined, err);
        }
    });
}
