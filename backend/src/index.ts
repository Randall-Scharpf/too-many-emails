// index.ts

// Or consider using node -r dotenv/config dist/index.js
import * as dotenv from 'dotenv';

// Load any environment variables from .env file or shell
dotenv.config()

/**
 * Start the server runtime.
 */
async function main() {
  console.log("Starting the server runtime...");
  /* TODO */
}

main().catch(console.error);
