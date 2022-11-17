// index.ts
// Entry point.

// Or consider using node -r dotenv/config dist/index.js
import * as dotenv from 'dotenv';
import { server } from './endpoints';
import { getLog } from './logging';

const log = getLog(__filename);

// Load any environment variables from .env file or shell
dotenv.config();

/**
 * Start the server runtime.
 */
async function main() {
    const port = process.env.PORT || 80;
    log(`Starting the server runtime on port ${port}...`);
    server.listen(port);
}

main().catch(console.error);
