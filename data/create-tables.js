const client = require('../lib/client');

// async/await needs to run in a function
run();

async function run() {

    try {
        // run a query to create tables
        await client.query(`
            CREATE TABLE nags (
                id SERIAL PRIMARY KEY NOT NULL,
                task VARCHAR(256) NOT NULL,
                notes VARCHAR(512),
                start_time TIME NOT NULL(hh:mm:ss),
                interval INT,
                period VARCHAR(16),
                user_id INT NOT NULL REFERENCES users(id)
            );

            CREATE TABLE users (
                id SERIAL PRIMARY KEY NOT NULL,
                push_api_key VARCHAR(256),
                email VARCHAR(256) NOT NULL,
                display_name VARCHAR(256) NOT NULL,
                password_hash VARCHAR(512) NOT NULL
            );
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }

}