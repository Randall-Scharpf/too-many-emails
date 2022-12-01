// clear.js
// Script for clearing all tables of the database at runtime.
// It does this by dropping all tables and then executing the schema file.
// This way, any changes in the schema are also reflected.

const sqlite3 = require("sqlite3");
const fs = require("node:fs");

const DB_FILE = process.env.DB_FILE || "./.data/sqlite.db";
const SCHEMA_FILE = process.env.SCHEMA_FILE || "./db-schema.sql";

const db = new (sqlite3.verbose()).Database(DB_FILE);

const TABLE_NAMES = [
    "KeyValue",
    "Users",
    "Tokens",
    "Address",
    "Email",
];

const RED = "\x1b[31m";
const END = "\x1b[0m";

console.log(`${RED}Clearing all tables in ${DB_FILE}.${END}`);

TABLE_NAMES.forEach(name => {
    db.run(`DROP TABLE IF EXISTS ${name};`, (err) => {
        err ? console.error(`${RED}${err.message}${END}`) : null;
    });
});

const schema = fs.readFileSync(SCHEMA_FILE).toString();
db.exec(schema, (err) => {
    err ? console.error(`${RED}${err.message}${END}`) : null;
});
