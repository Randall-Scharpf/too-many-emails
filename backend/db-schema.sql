/* Sanity check table.  */
CREATE TABLE KeyValue (
    Key TEXT,
    Value TEXT
);

/* Accounts that users register with our application.  We also refer to these
   as "parent emails" or "parent addresses" to disambiguate them from the
   throwaway email addresses that users make within the application.  */
CREATE TABLE User (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmailAddress TEXT UNIQUE NOT NULL,
    PasswordHash TEXT NOT NULL, -- SHA-256
    PasswordSalt TEXT NOT NULL -- 8 random ASCII
);

/* Addresses that users create within their account.  These are the throwaway
   email addresses intended for use.  */
CREATE TABLE Address (
    AddressID INTEGER PRIMARY KEY AUTOINCREMENT,
    EmailAddress TEXT UNIQUE NOT NULL,
    UserID INTEGER,
    FOREIGN KEY (UserID) REFERENCES User (UserID)
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
