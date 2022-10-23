// types.ts
// Define and export interfaces here

export interface Email {
  from: string,
  to: string | Array<string>,
  cc?: string | Array<string>,
  bcc?: string | Array<string>,
  subject?: string,
  text?: string,
  html?: string,
}
