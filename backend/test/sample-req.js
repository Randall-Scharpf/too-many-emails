const server = require("./sample-lib");
const { DUMMY_USER } = require("./sample-lib");

// test endpoints: reply with what they're given
server.getFromServer("/echo-get", { name: 'Mary Ann', job: 'Content Editor' }, console.log, console.log);
server.postToServer("/echo-post", { name: 'John Doe', job: 'Content Writer' }, console.log, console.log);

// database endpoint tests
server.postToServer("/db-post", { key: 'cool', value: 'stuff' }, console.log, console.log);
server.postToServer("/db-post", { key: 'cool' }, console.log, console.log);
server.postToServer("/db-post", { key: 'coolest' }, console.log, console.log);
server.postToServer("/db-post", { key: 'cooler' }, console.log, console.log);
server.postToServer("/db-post", { key: 'coolest', value: 'stuffed' }, console.log, console.log);

// ================================================== //

// authentication endpoints
server.postToServer("/create-user", { email: DUMMY_USER, pw: '12345678' }, console.log, console.log);
server.postToServer("/login-user", { email: DUMMY_USER, pw: '12345678' }, (res) => {
    console.log(res);
    server.postToServer("/change-password", { email: DUMMY_USER, token: res.token, pw: '12345678' }, console.log, console.log);
    server.postToServer("/logout-user", { email: DUMMY_USER, token: res.token }, console.log, console.log);
}, console.log);

// dummy emails to populate database
const DUMMY_EMAILS = [
    {
        from: "throwaway2@lmao.com",
        to: [DUMMY_USER, "nonexistent@abc123.com"],
        subject: "My Test Email",
        text: "hellooo how are you doing"
    },
    {
        from: "throwaway1@lmao.com",
        to: ["throwaway2@lmao.com", "throwaway3@lmao.com"],
        subject: "lol sending this to myself",
        text: null
    },
    {
        from: "not_in_out_DB@whippee.com",
        to: ["strawberry@mango.edu"],
        subject: "Edgy edge case?",
        text: "lorem ipsum sin dolor"
    },
    {
        from: "throwaway2@lmao.com",
        to: ["strawberry@mango.edu"],
        subject: null,
        text: "sup bro"
    }
];

/** Pretty print nested objects with JSON formatting.  */
function prettyPrint(object) {
    console.log(JSON.stringify(object, null, 2));
}

// email endpoints
for (const dummyEmail of DUMMY_EMAILS) {
    server.postToServer("/email", { ...dummyEmail }, console.log, console.error);
}
server.getFromServer("/all-sent-emails", { address: "throwaway2@lmao.com" }, prettyPrint, console.error);
server.getFromServer("/all-received-emails", { address: "throwaway2@lmao.com" }, prettyPrint, console.error);
