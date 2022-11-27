// index.ts
// Entry point.

// Or consider using node -r dotenv/config dist/index.js
import * as dotenv from 'dotenv';
import { initDB } from './db';
import { server } from './endpoints';

// Load any environment variables from .env file or shell,
// with .env file taking precedence
dotenv.config({ override: true });

// Initialize the database if necessary
initDB();

/**
 * Start the server runtime.
 */
async function main() {
    const port = parseInt(process.env.PORT) || 80;
    server.listen(port, () => {
        console.log(`Starting the server runtime on port ${port}...`);
    });
}

main().catch(console.error);
