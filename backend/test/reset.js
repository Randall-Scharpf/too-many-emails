// reset.js
// Clears all tables in existing database file.
// Fails if the database file doesn't exist.

const sqlite3 = require("sqlite3");
const { errorMsg } = require("./sample-lib");

const DB_FILE = process.env.DB_FILE || "./.data/sqlite.db";
const db = new (sqlite3.verbose()).Database(DB_FILE);

const TABLE_NAMES = ["KeyValue", "Users", "Tokens", "Address", "Email"];

TABLE_NAMES.forEach(name => {
    db.run(`DELETE FROM ${name};`, errorMsg);
});

