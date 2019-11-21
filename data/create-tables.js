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
                    mon BOOLEAN DEFAULT TRUE,
                    tue BOOLEAN DEFAULT TRUE,
                    wed BOOLEAN DEFAULT TRUE,
                    thu BOOLEAN DEFAULT TRUE,
                    fri BOOLEAN DEFAULT TRUE,
                    sat BOOLEAN DEFAULT TRUE,
                    sun BOOLEAN DEFAULT TRUE,
                    recurs BOOLEAN DEFAULT FALSE,
                    complete BOOLEAN DEFAULT FALSE,
                    id_string VARCHAR(30),
                    user_id INT NOT NULL REFERENCES users(id)
                );
            `);
            console.log('create tables complete');
        }
        catch (err) { console.log(err); }
        finally { client.end(); }
    }
)();