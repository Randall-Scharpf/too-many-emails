# too-many-emails

*For when you have too many emails from too many emailers, make too many emails: fight back!*

**F22 COM SCI 35L Final Project: Team Members**

- Vincent Lin (1E)
- Randall Scharpf (1E)
- Georgia Trentalange (1A)
- Abigail Okonski (1B)
- Modhi AlMarzooqi (1D)


## Description

This application is an email client that lets users create and keep track of temporary/throwaway emails in one place.

Many websites require a user to input their email address in order to benefit from their services. This web application strives to limit a user’s primary inbox to personal and professional emails rather than spam and promotional content, while still allowing future access. With other temporary email services, the email is "killed" after an allotted time, typically 10 minutes, which makes it difficult to re-authenticate a user’s email on certain websites.


## Compatibility

We developed this application with:

* **Node version:** v16+
* **OS:** Windows, MacOS
* **Browsers:** Microsoft Edge, Google Chrome


## Installation

<!-- TODO -->

Setting up the project repository:

```shell
git clone https://github.com/Randall-Scharpf/too-many-emails.git
cd too-many-emails
```

**In one shell,** run the back-end server:

```shell
cd backend
# TODO: RUN A SCRIPT TO GIVE US DEMO-READY DUMMY DATA
npm start
```

**In another shell,** run the front-end React application:

```shell
cd frontend
npm install
# OR owerShell: $env:SKIP_PREFLIGHT_CHECK = 'true'
export SKIP_PREFLIGHT_CHECK=true
npm start
```

The web application should open in the default browser at `localhost:3000`, but if not, one can direct their browser to that address.

<!-- TODO -->


## Development

```shell
git clone https://github.com/Randall-Scharpf/too-many-emails.git
cd too-many-emails
# Create your branch
git checkout -b your-branch-name
```

<table>
<tr>
  <th>Frontend Team</th>
  <th>Backend Team</th>
</tr>
<tr>
<td>

```shell
cd frontend
npm install
# Run application on localhost:3000
npm start
```

</td>
<td>

```shell
cd backend
npm install
# Enable live TypeScript compiler in one shell
npm run dev
# Start the runtime in another shell
# nodemon will automatically restart the server on changes
npm start
# Populate database with dummy data in another shell
npm run populate
```

</td>
</tr>
</table>


### Frontend Notes

<!-- TODO -->

⚠️ Add any instructions or reminders for yourselves here.

<!-- TODO -->


### Backend Notes

- In favor of static type-checking, we will write the source code in TypeScript files under the [src/](backend/src/) directory.
- Using `npx tsc` for manual compilation or [`npm run dev`](backend/package.json#L7) to compile on save, the TS files are generated in the `.gitignore`d dist directory.
- We can edit the [TypeScript configuration file](backend/tsconfig.json) if we decide to update our TypeScript compiler preferences.
- Use the `npm start` script to start the server runtime. I use the [nodemon](https://www.npmjs.com/package/nodemon) development dependency to watch the compiled JavaScript files and automatically restart the server upon changes.
- Use the `npm run reset` script to forcefully recompile all `*.js` files and remove the database file from `.data/sqlite.db` entirely.
- Use the `npm run populate` script to run the sanity check scripts [`test/*.js`](backend/test/) for testing basic endpoint and DB functionality and populating the local database file with some dummy data.
