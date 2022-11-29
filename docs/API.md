# Back-end API

- [Back-end API](#back-end-api)
  - [Running the Server](#running-the-server)
  - [Using the Endpoint API](#using-the-endpoint-api)
  - [Authentication API](#authentication-api)
    - [POST `/create-user`](#post-create-user)
    - [POST `/login-user`](#post-login-user)
    - [POST `/logout-user`](#post-logout-user)
    - [POST `/change-password`](#post-change-password)
  - [Owned Addresses API](#owned-addresses-api)
    - [GET `/all-addresses`](#get-all-addresses)
    - [POST `/address`](#post-address)
  - [Email Objects API](#email-objects-api)
    - [GET `/all-sent-emails`](#get-all-sent-emails)
    - [GET `/all-received-emails`](#get-all-received-emails)
    - [POST `/email`](#post-email)
  - [User API](#user-api)
  - [Search API](#search-api)



## Running the Server

First make sure your branch is up-to-date. To start the server, set aside one shell to run:

```powershell
cd backend
npx tsc
npm start
```

As long as this shell is running, the server is live and listening for requests. You can then run your front-end React app like you normally would, in a separate shell instance:

```powershell
cd frontend
npm start
```


## Using the Endpoint API

> If you're on VS Code, you can open the rendered version of this page with `Ctrl+Shift+V`.

**ENDPOINT BASE URL:** `http://localhost:80`

For example, if an endpoint is specified as **POST** `/create-user`, this means it is designed to be reached with a `POST` request to the full URL of `http://localhost:80/create-user`.

For all endpoints, you must supply JSON data as part of the **request body**. Each endpoint expects different bodies and returns different **JSON responses**, so refer to the documentation of the specific endpoint detailed in the subsequent sections.

You can supply the required metadata via the [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) like so:

```javascript
fetch('http://localhost:80/create-user', {
    method: 'POST', // optional for 'GET'
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'josie_bruin@ucla.edu',
        pw: '12345678'
    })
})
    // Convert the Response object to JSON
    .then((response) => response.json())
    // Code to run using that JSON data
    .then((data) => { console.log(data); })
    // Code to run if fetching failed
    .catch((error) => { console.error(error); });
```

In the above example, the **request body**:

```javascript
{
    email: 'josie_bruin@ucla.edu',
    pw: '12345678'
}
```

Is what you're *sending* to the endpoint `http://localhost:80/create-user`. The **JSON response** is captured in the second `.then()`, as the `data` parameter. Usually you would pass this newly received data into the state of your current component for further processing:

```javascript
/* other code */
    .then((data) => {
        this.setState({
            foo: data.burger,
            bar: data.sandwich * 2 // or whatever
        })
    })
/* other code */
```

The advantage of this is that `this.setState` tells React to re-render the component, allowing whatever change you just made to take effect *visually*.

Some good resources:

* [Getting data from an API from React (YouTube)](https://www.youtube.com/watch?v=hzLDsxPGctY)
* [Mozilla fetch() API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)


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


## Owned Addresses API


**NOTE:** For the endpoints I (Vincent) wrote, due to a misunderstanding, the meaningful content (like an array of email addresses) is stored under the key `json` *within* the JSON response, which may be confusing. This `json` key is also `undefined` if you encounter an error, in which case an error `message` takes its place, but I imagine the `.catch()` callback will stop you from calling `undefined.json`. I'm not sure at all TBH. I have not tested most of this. If we encounter problems, I'll try to fix up the API.


### GET `/all-addresses`

Get all the addresses that a user owns. Responds with a `400` error if the input `email` is not registered as one of our users.

Example request body:

```json
{
  "email": "josie_bruin@ucla.edu"
}
```

Example response JSON:

```json
{
  "code": 200,
  "json": [
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
  "json": {}
}
```


## Email Objects API


### GET `/all-sent-emails`

Get all the emails sent through our client by a particular email address. This email address can be any address, real life or user-owned. If the address was never a sender before on our client, the JSON response is simply an empty array.

The returned email objects conform to the schema defined in [schema/email.json](schema/email.jsonc).

Example request body:

```json
{
  "address": "throwaway2@lmao.com"
}
```

Example response JSON:

```json
{
  "code": 200,
  "json": [
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

Example request body:

```json
{
  "address": "throwaway2@lmao.com"
}
```

Example response JSON:

```json
{
  "code": 200,
  "json": [
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
  "json": {}
}
```


## User API

TODO?


## Search API

TODO?