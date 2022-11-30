// helper.js

// Back-end base URL
const PORT = parseInt(process.env.PORT) || 80;
const BASE = `http://localhost:${PORT}`;

// ANSI escape sequences for colored text
const RED = "\x1b[31m";
const END = "\x1b[0m";

/**
 * Helper callback to pass to fetch.catch().
 * Output red text if an error is supplied.
 */
function errorMsg(error) {
    if (error)
        return;
    console.log(`${RED}${error.message}${END}`);
}

/**
 * Make an HTTP GET request to an endpoint off the BASE URL.
 * 
 * @param {string} endpoint Back-end API endpoint e.g '/all-sent-emails'.
 * @param {object} params Key-value pairs to encode as URL parameters.
 * @param {(object) => void} callback Code to run with the JSON response object.
 */
export const getFromServer = (endpoint, params, callback) => {
    const urlparams = new URLSearchParams(params).toString();
    fetch(`${BASE}${endpoint}?${urlparams}`)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(errorMsg);
};

/**
 * Make an HTTP POST request to an endpoint off the BASE URL.
 * 
 * @param {string} endpoint Back-end API endpoint e.g. '/create-user'.
 * @param {object} body JSON object to send as the request body.
 * @param {(object) => void} callback Code to run with the JSON response object.
 */
export const postToServer = (endpoint, body, callback) => {
    fetch(`${BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(data => callback(data))
        .catch(errorMsg);
};