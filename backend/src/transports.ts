// transports.ts
// Define configuration for some major email domains

export const OUTLOOK_TRANSPORT = {
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false, // for TLS to work
  tls: {
    ciphers: "SSLv3",
  },
} as const;

// FIXME: gmail doesn't work, always gives the error:
// Invalid login: 535-5.7.8 Username and Password not accepted.
// Even with 'lesser secure applications' enabled or whatnot.
export const GMAIL_TRANSPORT = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
} as const;
