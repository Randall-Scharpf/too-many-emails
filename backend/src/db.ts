// db.ts
// Handler for database operators.

import * as fs from 'node:fs';
import * as sqlite3 from 'sqlite3';

const DB_FILE = process.env.DB_FILE || "./.data/sqlite.db";

/* Ensure paths */
if (!fs.existsSync("./.data")) {
    fs.mkdirSync("./.data");
}
const exists = fs.existsSync(DB_FILE);
if (!exists) {
    fs.openSync(DB_FILE, 'w');
}
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(DB_FILE);

db.serialize(() => {
    if (!exists) {
        db.run(
            "CREATE TABLE KeyValue (key TEXT, value TEXT)"
        );
        // console.log("New table KeyValue created!");
    }
});

db.each("SELECT * FROM KeyValue", (err, row) => {
    // console.log(row);
});


/*========================*/
/* Database API Functions */
/*========================*/

export function writeKv(key: string, value: string): void {
    db.run("DELETE FROM KeyValue WHERE key = ?", [key]);
    db.run("INSERT INTO KeyValue VALUES (?, ?)", [key, value]);
}

export function readKv(key: string, callback: (val: string | undefined, err: string | undefined) => void): void {
    db.all("SELECT * FROM KeyValue WHERE key = ?", [key], (err: string, rows) => {
        // console.log(rows);
        if (rows.length > 0) {
            callback(rows[0].value, undefined);
        } else {
            callback(undefined, err);
        }
    });
}
