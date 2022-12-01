const server = require("./sample-lib");
const { DUMMY_USER } = require("./sample-lib");

// address endpoints
server.postToServer("/address", { email: DUMMY_USER, address: "throwaway1@lmao.com" }, console.log, console.error);
server.postToServer("/address", { email: DUMMY_USER, address: "throwaway2@lmao.com" }, console.log, console.error);
server.postToServer("/address", { email: DUMMY_USER, address: "throwaway3@lmao.com" }, console.log, console.error);
server.getFromServer("/all-addresses", { email: DUMMY_USER }, console.log, console.error);
