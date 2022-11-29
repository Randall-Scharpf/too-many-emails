// queries.js
// Run some querying tests on an initialized database.

const { log, errorMsg, get, post, Email } = require("./sample-lib");
const { TEST_USERS, TEST_ADDRESS_LISTS } = require("./populate");


/** Code to execute when run as a script.  */
function main() {
    // Test adding addresses to each test user
    // Couldn't be done inside populate.js because addresses require their users
    // already exist and async has timing madness
    TEST_ADDRESS_LISTS.forEach(list => {
        list.forEach(pair => {
            post('/address', pair, data => {
                if (data.code == 200)
                    log(data.message);
                else
                    errorMsg(data);
            })
        });
    });

    const testUser = TEST_USERS[0];
    const { email } = testUser;

    // Test logging in, changing password, and logging out
    post('/login-user', { email }, data => {
        log(`Logged in user: ${email}`);
        const { token } = data;
        const newPassword = "abcdefgh";
        post('/change-password', { email, token, pw: newPassword }, data => {
            log(`Changed password of ${email} to ${newPassword}`);
            post('/logout-user', { email, token }, data => {
                log(`Logged out user: ${email}`);
            });
        });
    });

    // Test retrieving the outbox
    get('/all-sent-emails', { 'address': email }, data => {
        log(`Outbox for user ${email}:`)
        data.emails.forEach(obj => {
            console.log(new Email(...Object.values(obj)));
        });
    });

    // Test retrieving the inbox
    get('/all-received-emails', { 'address': email }, data => {
        log(`Inbox for user ${email}:`)
        data.emails.forEach(obj => {
            console.log(new Email(...Object.values(obj)));
        });
    });
}


if (require.main === module)
    main();
