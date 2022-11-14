// index.ts

// Or consider using node -r dotenv/config dist/index.js
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { sendEmail } from './sender';
import { Email } from './types';

// Load dummy data from .env file
dotenv.config()
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

/**
 * Start the server runtime.
 */
async function main() {
  // Define the email object
  const email: Email = {
    from: `"Vincent Lin" ${EMAIL_ADDRESS}`,
    to: new Array("soulace2425@outlook.com"),
    subject: "Test from Too Many Emails",
    text: "Hello there once again",
  };

  const info = await sendEmail(email, EMAIL_ADDRESS, EMAIL_PASSWORD);

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log(`ID of message sent: ${info.messageId}`);

  // Preview only available when sending through an Ethereal account
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)
    || '<unavailable>'}`);
}

main().catch(console.error);
