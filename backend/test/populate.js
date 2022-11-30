// populate.js
// Initialize the database with dummy data using endpoints.
// Assume the database file is deleted prior, so this file will create a new
// one. For some reason fs.unlinkSync encounters stupid resource busy error.

const sqlite3 = require("sqlite3");
const fs = require("node:fs");

const { sleep, log, errorMsg, post, User, Email } = require("./sample-lib");

// Ensure paths

const DB_FILE = "./.data/sqlite.db";
const SCHEMA_FILE = "./db-schema.sql"

/** SQLite3 database client instance.  */
const db = new (sqlite3.verbose()).Database(DB_FILE);

if (!fs.existsSync("./.data")) {
    fs.mkdirSync("./.data");
}
fs.openSync(DB_FILE, 'w');
const schema = fs.readFileSync(SCHEMA_FILE).toString();
db.exec(schema, errorMsg);

// Dummy data

const TEST_USERS = [
    new User('josie_bruin@ucla.edu', '12345678'),
    new User('joe_bruin@ucla.edu', 'pancake-l0ver'),
    new User('eggert@cs.ucla.edu', 'iloveCS35L'),
];

const TEST_EMAILS = [
    new Email('josie_bruin@ucla.edu', ['eggert@cs.ucla.edu'],
        'Please Stop', 'i\'m dying ;-;'),
    new Email('josie_bruin@ucla.edu', ['vinlin@g.ucla.edu', 'hello_there@nothing.com'],
        'hallo', null),
    new Email('vinlin@g.ucla.edu', ['joe_bruin@ucla.edu', 'josie_bruin@ucla.edu'],
        null, 'lol imagine sending something without a subject\n\ncringe'),
    new Email('eggert@cs.ucla.edu', ['josie_bruin@ucla.edu'],
        'RE: Please Stop', 'nah.'),
];

// Give each user 3 throwaway addresses
const TEST_ADDRESS_LISTS = TEST_USERS.map(({ email, pw }) => {
    const namePart = email.split("@")[0];
    return [1, 2, 3].map(num => (
        { email, address: `${namePart}_${num}@spam.com` }
    ));
});

module.exports = { TEST_USERS, TEST_EMAILS, TEST_ADDRESS_LISTS };


/** Code to run if executed as a script.  */
async function main() {
    // Insert dummy data with endpoints
    for (const user of TEST_USERS) {
        post('/create-user', user, async (data) => {
            if (data.code === 200)
                log(`Created user: ${user.email}`);
            else
                errorMsg(data);
        });
        await sleep(1000);
    }
    for (const email of TEST_EMAILS) {
        post('/email', email, async (data) => {
            log(`Sent email from ${email.from} to ${email.to}`);
        });
        await sleep(1000);
    }
}


if (require.main === module)
    main().catch(console.error);

