const http = require('http');
const SERVER_URL = '172.28.246.199';

function getFromServer(endpoint, data, resCallback, errCallback = () => {}) {
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

function postToServer(endpoint, data, resCallback, errCallback = () => {}) {
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

module.exports = { getFromServer, postToServer }
