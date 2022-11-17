const dbFile = "./.data/sqlite.db";
const fs = require("fs");
const exists = fs.existsSync(dbFile);
if (!fs.existsSync("./.data")) {
    fs.mkdirSync("./.data");
}
if (!exists) {
    fs.openSync(dbFile, 'w');
}
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
    if (!exists) {
        db.run(
            "CREATE TABLE KeyValue (key TEXT, value TEXT)"
        );
    }
    require("./auth").initAuthDb(db, !exists);
});

db.each("SELECT * FROM KeyValue", (err, row) => {
    // console.log(row);
});

export function writeKv(key: string, value: string) : void {
    db.run("DELETE FROM KeyValue WHERE key = ?", [key]);
    db.run("INSERT INTO KeyValue VALUES (?, ?)", [key, value]);
}

export function readKv(key: string, callback: (val: string | undefined, err: string | undefined) => void) : void {
    db.all("SELECT * FROM KeyValue WHERE key = ?", [key], (err, rows) => {
        // console.log(rows);
        if (rows.length > 0) {
            callback(rows[0].value, undefined);
        } else {
            callback(undefined, err);
        }
    });
}
