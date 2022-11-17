// index.ts

// Or consider using node -r dotenv/config dist/index.js
import * as dotenv from 'dotenv';
import { server } from './endpoints';

// Load any environment variables from .env file or shell
dotenv.config()

/**
 * Start the server runtime.
 */
async function main() {
    console.log("Starting the server runtime...");
    const port = process.env.PORT || 80;
    server.listen(port);
}

main().catch(console.error);
