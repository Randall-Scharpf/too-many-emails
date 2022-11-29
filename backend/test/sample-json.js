// sample-json.js
// Code to run as if I were at the front-end.

const fetch = require('node-fetch');

body = {
    email: 'josie_bruin@ucla.edu',
    address: 'some_address@lmao.com'
};

async function test() {
    const response = await fetch("http://localhost:80/address",
        {
            method: "post",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }
    );
    const data = await response.json();
    console.log(data);
}

test().catch(console.error);
