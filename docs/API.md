# Back-end API

> If you're on VS Code, you can open the rendered version of this page with `Ctrl+Shift+V`.

- [Back-end API](#back-end-api)
  - [Running the Server](#running-the-server)
  - [Using the Endpoint API](#using-the-endpoint-api)
  - [`fetch()` API Crash Quick Start](#fetch-api-crash-quick-start)
  - [Authentication API](#authentication-api)
    - [POST `/create-user`](#post-create-user)
    - [POST `/login-user`](#post-login-user)
    - [POST `/logout-user`](#post-logout-user)
    - [POST `/change-password`](#post-change-password)
  - [POST `/logout-all-users`](#post-logout-all-users)
  - [Owned Addresses API](#owned-addresses-api)
    - [GET `/all-addresses`](#get-all-addresses)
    - [POST `/address`](#post-address)
  - [Email Objects API](#email-objects-api)
    - [GET `/all-sent-emails`](#get-all-sent-emails)
    - [GET `/all-received-emails`](#get-all-received-emails)
    - [POST `/email`](#post-email)



## Running the Server

First make sure your branch is up-to-date. To start the server, set aside one shell to run:

```powershell
cd backend
npx tsc
npm start
```

This automatically updates any dependencies and starts the server runtime.

**While the server is running,** you can populate your local database file with some dummy data with another shell:

```powershell
cd backend
npm run populate  # clear all tables and insert dummy data
npm run clear     # or just clear all tables
```

As long as the back-end shell is running, the server is live and listening for requests, and you can run `npm run populate` as many times as you want to reset the database back to its original dummy data.

You can then run your front-end React app like you normally would, in a separate shell instance:

```powershell
cd frontend
npm start
```


## Using the Endpoint API

**ENDPOINT BASE URL:** `http://localhost:80`

For example, if an endpoint is specified as **POST** `/create-user`, this means it is designed to be reached with a `POST` request to the full URL of `http://localhost:80/create-user`.

* For **POST** endpoints, you must supply JSON data as part of the **request body**.
* FOR **GET** endpoints, you must supply **URL parameters** appended to the endpoint URL.
* Each endpoint expects different bodies/parameters and returns different **JSON responses**, so refer to the documentation of the specific endpoint detailed in the later sections.


## `fetch()` API Crash Quick Start

Some good resources:

* [Getting data from an API from React (YouTube)](https://www.youtube.com/watch?v=hzLDsxPGctY)
* [Mozilla fetch() API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)


**UPDATE:** I added the helper functions `getFromServer` and `postToServer` in a [helper.js module](../frontend/src/helper.js) to extract the `fetch()` API.

```javascript
import { getFromServer, postToServer } from "./path/to/helper";
```

Some examples from within a class-based React component:

```javascript
getFromServer("/all-addresses", {  // endpoint name
  email: "josie_bruin@ucla.edu"    // parameters to supply
},
  // callback that uses the JSON response data
  data => this.setState({ addresses: data.addresses })
);
```

```javascript
postToServer("/address", {          // endpoint name
  email: "josie_bruin@ucla.edu",    // JSON body to supply
  address: "my_throwaway@2me.com",
},
  // callback that uses the JSON response data
  data => {
    if (data.code === 400) {
      alert(data.message);  // '<address> already taken!'
      /* failure code */
    } else {
      /* success code */
    }
  }
);
```

Because of the nature of asynchronous code, you'll most likely be taking the response data from the endpoint and calling `this.setState` with it to be processed in some other part of the component, like `render()`. The advantage of this is that `this.setState` automatically tells React to re-render the component, making whatever change you just made to take effect *visually*.

The rest of the sections are the documentation for the specific endpoints. They're designed so that you can simply replace the respective `body` or `params` boilerplate in the request with the objects show in each example. Processing the JSON response, `data`, is then a matter of knowing what keys are available and what types they are, which are also provided in examples below.


## Authentication API


### POST `/create-user`

Create a new user with a (real life) email and password. The password is transmitted as plain text, but the database stores them as a hash and salt value.

Example request body:

```json
{
  "email": "josie_bruin@ucla.edu",
  "pw": "12345678"
}
```

Example JSON response:

```json
{
  "code": 200,
  "message": "Success"
}
```


### POST `/login-user`

Update a user to be in the "logged in" state. When a user is logged in, the server generates an **authentication token**, which is necessary for making requests that only logged-in users should be allowed to make, like [changing their password](#post-change-password).

Example request body:

```json
{
  "email": "josie_bruin@ucla.edu",
  "pw": "1234"
}
```

Example response JSON:

```json
{
  "code": 200,
  "token": "ef62af4ec3b3af6553cec2f5a0f7b57f21190045dec1d7a766e8fdf29a153daae8054ce7a9949b485789ee81340c36fdc4a7d867c0fd6983ebeeeca8b6aaefbf"
}
```


### POST `/logout-user`

Update a user to no longer be in the "logged in" state, thereby removing their authentication token from the database.

Example request body:

```json
{
  "email": "josie_bruin@ucla.edu",
  "token": "ef62af4ec3b3af6553cec2f5a0f7b57f21190045dec1d7a766e8fdf29a153daae8054ce7a9949b485789ee81340c36fdc4a7d867c0fd6983ebeeeca8b6aaefbf"
}
```

Example response JSON:

```json
{
  "code": 200,
  "message": "Logged out of josie_bruin@ucla.edu"
}
```


### POST `/change-password`

Change a user's password.

Example request body:

```json
{
  "email": "josie_bruin@ucla.edu",
  "token": "ef62af4ec3b3af6553cec2f5a0f7b57f21190045dec1d7a766e8fdf29a153daae8054ce7a9949b485789ee81340c36fdc4a7d867c0fd6983ebeeeca8b6aaefbf",
  "pw": "abcdefgh"
}
```

Example response JSON:

```json
{
  "code": 200,
  "message": "Success"
}
```


## POST `/logout-all-users`

Log out all users by deleting all authentication tokens in the database. This was a necessary workaround for fixing the 'already logged in errors' when React would re-render the application starting from the login page and not let us log back into the same test user.

This endpoint does not require any content in the request body.

Example JSON response:

```json
{
  "code": 200,
  "message": "Successfully logged out all users"
}
```


## Owned Addresses API


### GET `/all-addresses`

Get all the addresses that a user owns. Responds with a `400` error if the input `email` is not registered as one of our users.

Example key-value pairs to encode:

```json
{
  "email": "josie_bruin@ucla.edu"
}
```

Example response JSON:

```json
{
  "code": 200,
  "addresses": [
    "throwaway1@lmao.com",
    "throwaway3@lmao.com",
    "throwaway2@lmao.com"
  ]
}
```


### POST `/address`

Add an address as one of the user's owned email addresses. Responds with a `400` error if:

* The input `email` is not registered as one of our users.
* The desired `address` is already taken.

Example request body:

```json
{
  "email": "josie_bruin@ucla.edu",
  "address": "throwaway4@lmao.com"
}
```

Example response JSON:

```json
{
  "code": 200,
  "message": "Added throwaway4@lmao.com to user josie_bruin@ucla.edu's list"
}
```


## Email Objects API


### GET `/all-sent-emails`

Get all the emails sent through our client by a particular email address. This email address can be any address, real life or user-owned. If the address was never a sender before on our client, the JSON response is simply an empty array.

The returned email objects conform to the schema defined in [schema/email.json](schema/email.jsonc).

Example key-value pairs to encode:

```json
{
  "address": "throwaway2@lmao.com"
}
```

Example response JSON:

```json
{
  "code": 200,
  "emails": [
    {
      "from": "throwaway2@lmao.com",
      "to": [
        "josie_bruin@ucla.edu",
        "nonexistent@abc123.com"
      ],
      "subject": "My Test Email",
      "text": "hellooo how are you doing"
    },
    {
      "from": "throwaway2@lmao.com",
      "to": [
        "strawberry@mango.edu"
      ],
      "subject": null,
      "text": "sup bro"
    }
  ]
}
```


### GET `/all-received-emails`

Get all the emails for which a particular email address is or is one of the recipients. This email address can be any address, real life or user-owned. If the address was never a recipient on our client before, the JSON response is simply an empty array.

The returned email objects conform to the schema defined in [schema/email.json](schema/email.jsonc).

Example key-value pairs to encode:

```json
{
  "address": "throwaway2@lmao.com"
}
```

Example response JSON:

```json
{
  "code": 200,
  "emails": [
    {
      "from": "throwaway1@lmao.com",
      "to": [
        "throwaway2@lmao.com",
        "throwaway3@lmao.com"
      ],
      "subject": "lol sending this to myself",
      "text": null
    }
  ]
}
```


### POST `/email`

Add an email object to the database.

The input email object must conform to the schema defined in [schema/email.json](schema/email.jsonc).

Example request body:

```json
{
  "from": "throwaway2@lmao.com",
  "to": ["eggert@cs.ucla.edu", "throwaway4@lmao.com"],
  "subject": "My Test Email",
  "text": "Hello all,\n\nThis is some dummy test. That is all.\n"
}
```

Example response JSON:

```json
{
  "code": 200,
  "message": "Stored email from throwaway2@lmao.com to eggert@cs.ucla.edu,throwaway4@lmao.com"
}
```
