server = require("./sample-lib");
server.getFromServer("/echo-get", { name: 'Mary Ann', job: 'Content Editor' }, console.log, console.log);
server.postToServer("/echo-post", { name: 'John Doe', job: 'Content Writer' }, console.log, console.log);
// server.postToServer("/db-post", { key: 'cool', value: 'stuff' }, console.log, console.log);
server.postToServer("/db-post", { key: 'cool' }, console.log, console.log);
server.postToServer("/db-post", { key: 'coolest' }, console.log, console.log);
server.postToServer("/db-post", { key: 'cooler' }, console.log, console.log);