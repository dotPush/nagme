const client = require('../lib/client');

( //IIFE
    async() => {
        try {
            // run a query to create tables
            await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY NOT NULL,
                    email VARCHAR(256) NOT NULL,
                    display_name VARCHAR(256) NOT NULL,
                    password_hash VARCHAR(512) NOT NULL,
                    push_api_key VARCHAR(256),
                    email_to_SMS VARCHAR(256),
                    alert_email VARCHAR(256)
                );
                
                CREATE TABLE nags (
                    id SERIAL PRIMARY KEY NOT NULL,
                    task VARCHAR(256) NOT NULL,
                    notes VARCHAR(512),
                    start_time TIME NOT NULL,
                    end_time TIME,
                    interval INT,
                    minutes_after_hour INT,
                    snoozed BOOLEAN,
                    period VARCHAR(16),
                    mon BOOLEAN,
                    tue BOOLEAN,
                    wed BOOLEAN,
                    thu BOOLEAN,
                    fri BOOLEAN,
                    sat BOOLEAN,
                    sun BOOLEAN,
                    recurs BOOLEAN,
                    complete BOOLEAN,
                    id_string VARCHAR(30),
                    user_id INT NOT NULL REFERENCES users(id)
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
)();