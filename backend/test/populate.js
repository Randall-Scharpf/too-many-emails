// populate.js
// Initialize the database with dummy data using endpoints.
// If there is existing data in the database, it will be overwritten.
// Fails if the database file does not exist.

const sqlite3 = require("sqlite3");
const fetch = require('node-fetch');
const moment = require('moment');

const DB_FILE = process.env.DB_FILE || "./.data/sqlite.db";
const PORT = parseInt(process.env.PORT) || 80;

const db = new (sqlite3.verbose()).Database(DB_FILE);
const base = `http://localhost:${PORT}`;


// Manually clear all tables

db.run("DELETE FROM KeyValue;");
db.run("DELETE FROM Users;");
db.run("DELETE FROM Tokens;");
db.run("DELETE FROM Address;");
db.run("DELETE FROM Email;");

/** Prefix a console.log() message with a timestamp.  */
function log(message, ...optionalParams) {
    console.log(`[${moment().format('HH:mm:ss:SSSS')}] ${message}`, ...optionalParams);
}

/** Prefix a console.error(error.message) message with a timestamp.  */
function errorMsg(error) {
    console.error(`\x1b[31m[${moment().format('HH:mm:ss:SSSS')}] ${error.message}\x1b[0m`);
}


// Helper functions for making requests via the fetch() API
// Param callback is only called upon .then().
// .catch() is automatically written with console.error().

function get(endpoint, params, callback) {
    const urlparams = new URLSearchParams(params).toString();
    fetch(`${base}${endpoint}?${urlparams}`)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(errorMsg);
}

function post(endpoint, body, callback) {
    fetch(`${base}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(errorMsg);
}

// Class based-models of object interfaces

class User {
    constructor(email, pw) {
        this.email = email;
        this.pw = pw;
    }
}

class Email {
    constructor(from, to, subject = null, text = null) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }
}

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


// Insert dummy data with endpoints

TEST_USERS.forEach(user => {
    post('/create-user', user, data => {
        log(`Created user: ${user.email}`);
    });
});

const loginTestUser = TEST_USERS[0];
post('/login-user', { email: loginTestUser.email }, data => {
    log(`Logged in user: ${loginTestUser.email}`);
    const { token } = data;
    post('/logout-user', { email: loginTestUser.email, token: token }, data => {
        log(`Logged out user: ${loginTestUser.email}`);
    });
});

TEST_EMAILS.forEach(email => {
    post('/email', email, data => {
        log(`Sent email from ${email.from} to ${email.to}`);
    });
});

const testSenderUser = TEST_USERS[0];
get('/all-sent-addresses', { 'address': testSenderUser.email }, data => {
    data.json.forEach(obj => {
        console.log(Email(...obj));
    });
});
