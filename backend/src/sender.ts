// sender.ts
// API for sending email objects

import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { GMAIL_TRANSPORT, OUTLOOK_TRANSPORT } from './transports';
import { Email } from './types';

/**
 * Return the transport configuration mapping for the SMTP service that the
 * sender email address uses. At the moment, our hard-coded switch statement
 * maps the following email domain names:
 *
 * gmail.com, g.ucla.edu -> GMAIL_TRANSPORT
 * hotmail.com, outlook.com -> OUTLOOK_TRANSPORT
 */
function getTransportConfig(sender: string): Object | null {
  const sep = sender.indexOf("@");
  if (sep === -1)
    return null;
  const domainName = sender.substring(sep + 1);
  // Good enough for now lol
  switch (domainName) {
    case "gmail.com":
    case "g.ucla.edu":
      return GMAIL_TRANSPORT;
    case "hotmail.com":
    case "outlook.com":
      return OUTLOOK_TRANSPORT;
    default:
      return null;
  }
}

/**
 * Send an email object using the username and password credentials.  If the
 * domain provider cannot be determined from the email sender (`email.from`),
 * then the Promise is rejected.  If successful, return a `SentMessageInfo`
 * object containing information about the sent email.
 */
export async function sendEmail(
  email: Email,
  username: string,
  password: string
): Promise<SentMessageInfo> {

  const config = getTransportConfig(email.from);
  if (config === null) {
    throw new Error(`Could not determine domain provider for ${email.from}.`);
  }

  const transporter = nodemailer.createTransport({
    ...config,
    auth: {
      user: username,
      pass: password,
    },
  });

  // Send the email with the defined transport object
  return await transporter.sendMail(email);
}
