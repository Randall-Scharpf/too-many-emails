// types.ts
// Define and export interfaces here

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
     * Optional email addresses to CC. These support the same format as the
     * sender.
     */
    cc?: Array<string>,
    /**
     * Optional email addresses to BCC. These support the same format as the
     * sender.
     */
    bcc?: Array<string>,
    /**
     * Optional subject line of the email.
     */
    subject?: string,
    /**
     * Optional body of the email, in plain text.
     */
    text?: string
}


/** Represents an HTTP response to populate and send back via res.  */
export interface Response {
    /** HTTP status code.  */
    code: number,
    /** Error message for bad requests.  */
    message?: string
    /** Requested JSON content for fulfilled requests.  */
    json?: object
}
