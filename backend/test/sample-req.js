const server = require("./sample-lib");

const DUMMY_USER = 'josie_bruin@ucla.edu';

// test endpoints: reply with what they're given
server.getFromServer("/echo-get", { name: 'Mary Ann', job: 'Content Editor' }, console.log, console.log);
server.postToServer("/echo-post", { name: 'John Doe', job: 'Content Writer' }, console.log, console.log);

// database endpoint tests
server.postToServer("/db-post", { key: 'cool', value: 'stuff' }, console.log, console.log);
server.postToServer("/db-post", { key: 'cool' }, console.log, console.log);
server.postToServer("/db-post", { key: 'coolest' }, console.log, console.log);
server.postToServer("/db-post", { key: 'cooler' }, console.log, console.log);
server.postToServer("/db-post", { key: 'coolest', value: 'stuffed' }, console.log, console.log);

// authentication endpoints
server.postToServer("/create-user", { email: DUMMY_USER, pw: '12345678' }, console.log, console.log);
server.postToServer("/login-user", { email: DUMMY_USER, pw: '12345678' }, (res) => {
    console.log(res);
    server.postToServer("/change-password", { email: DUMMY_USER, token: res.token, pw: '12345678' }, console.log, console.log);
    server.postToServer("/logout-user", { email: DUMMY_USER, token: res.token }, console.log, console.log);
}, console.log);
