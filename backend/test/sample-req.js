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

// address endpoints
server.postToServer("/address", { email: DUMMY_USER, address: "throwaway1@lmao.com" }, console.log, console.error);
server.postToServer("/address", { email: DUMMY_USER, address: "throwaway2@lmao.com" }, console.log, console.error);
server.postToServer("/address", { email: DUMMY_USER, address: "throwaway3@lmao.com" }, console.log, console.error);

// TODO: this doesn't work because getFromServer only uses params instead of body
// server.getFromServer("/all-addresses", { email: DUMMY_USER }, console.log,
// console.error);

// dummy emails to populate database
const DUMMY_EMAILS = [
    {
        from: "throwaway2@lmao.com",
        to: `${DUMMY_USER},nonexistent@abc123.com`,
        subject: "My Test Email",
        text: "hellooo how are you doing"
    },
    {
        from: "throwaway1@lmao.com",
        to: `throwaway2@lmao.com`,
        subject: "lol sending this to myself",
        text: null
    },
    {
        from: "not_in_out_DB@whippee.com",
        to: "strawberry@mango.edu",
        subject: "Edgy edge case?",
        text: "lorem ipsum sin dolor"
    }
];

// email endpoints
for (const dummyEmail of DUMMY_EMAILS) {
    server.postToServer("/email", { "email": dummyEmail }, console.log, console.error);
}
