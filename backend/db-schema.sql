/* Sanity check table.  */
CREATE TABLE KeyValue (
    Key TEXT,
    Value TEXT
);

/* Accounts that users register with our application.  We also refer to these
   as "parent emails" or "parent addresses" to disambiguate them from the
   throwaway email addresses that users make within the application.  */
CREATE TABLE Account (
    ID INT PRIMARY KEY AUTOINCREMENT,
    EmailAddress TEXT UNIQUE NOT NULL,
    PasswordHash TEXT NOT NULL, -- SHA-256
    PasswordSalt TEXT NOT NULL -- 8 random ASCII
    -- TODO: probably needs more columns
);

/* Addresses that users create within their account.  These are the throwaway
   email addresses intended for use.  */
CREATE TABLE Address (
    ID INT PRIMARY KEY AUTOINCREMENT,
    EmailAddress TEXT UNIQUE NOT NUKL,
    -- TODO: probably needs more columns
);
