// types.ts
// Define and export interfaces here

/** Represents an email sent or received by our client.  */
export interface Email {
    /**
     * Email address of the sender.  It can be in the format 'username@domain.com'
     * or with a (Unicode supported) name '"Name Here" username@domain.com'.
    */
    from: string,
    /**
     * Email addresses to send to.  These support the same format as the sender.
     */
    to: Array<string>,
    /**
     * Optional subject line of the email.
     */
    subject?: string,
    /**
     * Optional body of the email, in plain text.
     */
    text?: string,

    /**
     * Timestamp of the email transmission, in the format "YYYY-MM-DD HH:MM:SS".
     */
    timestamp: string
}
