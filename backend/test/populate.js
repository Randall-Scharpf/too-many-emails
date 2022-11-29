// populate.js
// Initialize the database with dummy data using endpoints.
// If there is existing data in the database, it will be overwritten.
// Fails if the database file does not exist.

const { clearDB, log, errorMsg, post, User, Email } = require("./sample-lib");

// Dummy data

const TEST_USERS = [
    new User('josie_bruin@ucla.edu', '12345678'),
    new User('joe_bruin@ucla.edu', 'pancake-l0ver'),
    new User('eggert@cs.ucla.edu', 'iloveCS35L'),
];

const TEST_EMAILS = [
    new Email('josie_bruin@ucla.edu', ['eggert@cs.ucla.edu'],
        'Please Stop', 'i\'m dying ;-;'),
    new Email('josie_bruin@ucla.edu', ['vinlin@g.ucla.edu', 'hello_there@nothing.com'],
        'hallo', null),
    new Email('vinlin@g.ucla.edu', ['joe_bruin@ucla.edu', 'josie_bruin@ucla.edu'],
        null, 'lol imagine sending something without a subject\n\ncringe'),
    new Email('eggert@cs.ucla.edu', ['josie_bruin@ucla.edu'],
        'RE: Please Stop', 'nah.'),
];

// Give each user 3 throwaway addresses
const TEST_ADDRESS_LISTS = TEST_USERS.map(({ email, pw }) => {
    const namePart = email.split("@")[0];
    return [1, 2, 3].map(num => (
        { email, address: `${namePart}_${num}@spam.com` }
    ));
});

module.exports = { TEST_USERS, TEST_EMAILS, TEST_ADDRESS_LISTS };


/** Code to run if executed as a script.  */
function main() {
    clearDB();

    // Insert dummy data with endpoints
    TEST_USERS.forEach(user => {
        post('/create-user', user, data => {
            if (data.code === 200)
                log(`Created user: ${user.email}`);
            else
                errorMsg(data);
        });
    });
    TEST_EMAILS.forEach(email => {
        post('/email', email, data => {
            log(`Sent email from ${email.from} to ${email.to}`);
        });
    });
}


if (require.main === module)
    main();

