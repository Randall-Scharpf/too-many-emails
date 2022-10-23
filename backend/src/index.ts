// index.ts
// Learning and testing SMTP in Node.js

// Or consider using node -r dotenv/config dist/index.js
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { Email } from './types';

// Load dummy data from .env file
dotenv.config()
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const OUTLOOK = {
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false, // for TLS to work
  tls: {
    ciphers: "SSLv3",
  },
}

const GMAIL = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
}

async function main() {
  // Create reusable transporter object using the outlook SMTP speccs
  const transporter = nodemailer.createTransport({
    ...GMAIL,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  // Define the email object
  const email: Email = {
    from: `"Vincent Lin" ${EMAIL_ADDRESS}`,
    to: "soulace2425@outlook.com",
    subject: "Test from Too Many Emails",
    text: "Hello there",
    html: "<b>General Kenobi!</b>",
  };

  // Send the email with the defined transport object
  const info = await transporter.sendMail(email);

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log(`ID of message sent: ${info.messageId}`);

  // Preview only available when sending through an Ethereal account
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}

// FIXME
// Error: Invalid login: 535-5.7.8 Username and Password not accepted.
main().catch(console.error);
