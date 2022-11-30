const http = require('http');
const SERVER_URL = 'localhost';

function getFromServer(endpoint, data, resCallback, errCallback = () => { }) {
    data = new URLSearchParams(data).toString();
    const req = http.request({
        hostname: SERVER_URL, path: endpoint + '?' + data, method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Content-Length': 0 }
    });
    req.on('response', (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            if (res.statusCode == 200) resCallback(JSON.parse(data));
            else resCallback(res.statusCode + ": " + res.statusMessage);
        });
        res.on('error', errCallback);
    })
    req.on('error', errCallback)
    req.end();
    return SERVER_URL + endpoint + '?' + data;
}

function postToServer(endpoint, data, resCallback, errCallback = () => { }) {
    data = JSON.stringify(data);
    const req = http.request({
        hostname: SERVER_URL, path: endpoint, method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
    });
    req.write(data);
    req.on('response', (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            if (res.statusCode == 200) resCallback(JSON.parse(data));
            else resCallback(res.statusCode + ": " + res.statusMessage);
        });
        res.on('error', errCallback);
    })
    req.on('error', errCallback)
    req.end();
    return SERVER_URL + endpoint;
}

// example usage
// var requestUrl = postToServer("/echo-post", { name: 'John Doe', job: 'Content Writer' }, console.log, console.log);
// var requestUrl = getFromServer("/echo-get", { name: 'Mary Ann', job: 'Content Editor' }, console.log, console.log);


// ==================== ADDED ==================== //

const fetch = require('node-fetch');
const moment = require('moment');

const PORT = parseInt(process.env.PORT) || 80;
const BASE = `http://localhost:${PORT}`;

const RED = "\x1b[31m";
const YEL = "\x1b[33m";
const END = "\x1b[0m";


/** Simple delay function.  */
function sleep(ms) {
    new Promise(r => setTimeout(r, ms));
}


/** Prefix a console.log() message with a timestamp.  */
function log(message, ...optionalParams) {
    console.log(`${YEL}[${moment().format('HH:mm:ss:SSSS')}]${END} ${message}`, ...optionalParams);
}


/** Prefix a console.error(error.message) message with a timestamp.  */
function errorMsg(error) {
    if (!error)
        return;
    console.error(`${YEL}[${moment().format('HH:mm:ss:SSSS')}]${END} ${RED}${error.message}${END}`);
}


// Helper functions for making requests via the fetch() API
// Param callback is only called upon .then().
// .catch() is automatically written with console.error().

/** Make a GET request, expanding object params into URL-encoded parameters.  */
function get(endpoint, params, callback) {
    const urlparams = new URLSearchParams(params).toString();
    fetch(`${BASE}${endpoint}?${urlparams}`)
        .then(response => response.json())
        .then(data => callback(data))
    // .catch(errorMsg);
}


/** Make a POST request, using param body as the JSON body of the request.  */
function post(endpoint, body, callback) {
    fetch(`${BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(errorMsg);
}


// Class based-models of object interfaces

class Model {
    toString() {
        return JSON.stringify(this, null, 2);
    }
}


class User extends Model {
    constructor(email, pw) {
        super();
        this.email = email;
        this.pw = pw;
    }
}


class Email extends Model {
    constructor(from, to, subject = null, text = null) {
        super();
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
    }
}


module.exports = { getFromServer, postToServer, sleep, log, errorMsg, get, post, User, Email };
