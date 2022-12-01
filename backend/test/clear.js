// clear.js
// Script for clearing all tables of the database at runtime.

const sqlite3 = require("sqlite3");

const DB_FILE = process.env.DB_FILE || "./.data/sqlite.db";
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
    db.run(`DELETE FROM ${name};`, (err) => {
        err ? console.error(`${RED}${err.message}${END}`) : null;
    });
});
