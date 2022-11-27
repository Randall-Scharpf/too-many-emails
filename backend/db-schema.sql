-- db-schema.sql
-- SQL code to execute when initializing the database for the first time.

/* Accounts that users register with our application.  We also refer to these
   as "parent emails" or "parent addresses" to disambiguate them from the
   throwaway email addresses that users make within the application.
   NOTE: Inconsistency in naming due to trying to not break Randall's existing
   auth.ts.  */
CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    pwhash TEXT NOT NULL, -- SHA-256
    salt TEXT NOT NULL -- 8 random ASCII
);

/* Authentication tokens.
   NOTE: Inconsistency in naming due to trying not to break Randall's existing
   auth.ts.  */
CREATE TABLE Tokens (
    TokenID INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    token TEXT NOT NULL,
    expiry INTEGER NOT NULL
);

/* Addresses that users create within their account.  These are the throwaway
   email addresses intended for use.  */
CREATE TABLE Address (
    AddressID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmailAddress TEXT UNIQUE NOT NULL,
    UserID INTEGER,
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

/* An email sent by or received by our client.  */
CREATE TABLE Email (
    EmailID INTEGER PRIMARY KEY AUTOINCREMENT,
    SenderAddress TEXT NOT NULL,
    ReceiverAddresses TEXT NOT NULL,
    CCAddresses TEXT,
    BCCAddresses TEXT,
    Subject TEXT,
    Body TEXT
);
