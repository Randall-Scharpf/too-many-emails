// dummy.js
// More dummy data, inserted directly into the database instead of through
// endpoints. This will act like data that was "already there" in our
// application.

const fs = require("node:fs");
const path = require("node:path");

const sqlite3 = require("sqlite3");

/** Convert a path relative from this script to an absolute path.  */
function AbsPath(relative) {
    return path.join(__dirname, relative);
}

const DB_FILE = process.env.DB_FILE || AbsPath("../.data/sqlite.db");

const db = new (sqlite3.verbose()).Database(DB_FILE);


DUMMY_USERS = JSON.parse(
    fs.readFileSync(AbsPath("data/users.json")).toString()
);

DUMMY_ADDRESSES = JSON.parse(
    fs.readFileSync(AbsPath("data/addresses.json")).toString()
)

DUMMY_EMAILS = JSON.parse(
    fs.readFileSync(AbsPath("data/emails.json")).toString()
)
