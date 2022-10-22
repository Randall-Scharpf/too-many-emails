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

### [Frontend](/frontend/) Team

```shell
cd frontend
npm install  # if it's your first time
```

<!-- TODO -->

⚠️ Add any instructions or reminders here.

<!-- TODO -->


### [Backend](/backend/) Team

```shell
cd backend
npm install  # if it's your first time
```

To run the application, invoke the [entry point](backend/dist/index.js) with [this script](backend/package.json#L8):

```shell
npm start
```

In favor of static type-checking, we will write our source code in [`src/*.ts`](backend/src/) files, which can then be compiled to [`dist/*.js`](backend/dist/) files with `npx tsc`. Alternatively, to automatically compile source files on save, run [this script](backend/package.json#L7) in a spare terminal:

```shell
npm run dev
```

We can edit the [TypeScript configuration file](backend/tsconfig.json) if we decide to update our TypeScript compiler preferences.
