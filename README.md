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


## Installation

<!-- TODO -->

⚠️ Add instructions on how to set up and run our application locally as mandated by the [spec](https://web.cs.ucla.edu/classes/fall22/cs35L/project.html).

Some things we might need to consider and should not forget when the time comes to update this section:

- Compatible operating systems, browsers, Node.js versions, etc.
- Necessary environment variables, if any
- Shell commands to run (possibly for both Windows and Unix), including:
  - Cloning the repository or downloading and installing a distribution file
  - Installing Node.js dependencies
  - Running the application and viewing it in the browser

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
- Use the `npm reset` script to forcefully recompile all `*.js` files and remove the database file from `.data/sqlite.db` entirely.
- Use the `npm reset` script to run the sanity check script `test/sample-req.js` for testing basic endpoint and DB functionality.
