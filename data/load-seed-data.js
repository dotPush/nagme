const client = require('../lib/client');
// import our seed data:
const users = require('./seed-users');
const nags = require('./seed-nags');

run();

async function run() {

    try {
        // await client.connect();

        // First save types and get each returned row which has
        // the id of the type. Notice use of RETURNING:
        await Promise.all(
            users.map(async user => {
                const result = await client.query(`
                    INSERT INTO users (
                        email, 
                        display_name, 
                        password_hash) 
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `, 
                [user.email, user.displayName, user.passwordHash]);
                
                return result.rows[0];
            })
        );
    
        await Promise.all(
            nags.map(nag => {

                // Find the corresponding type id
                return client.query(`
                    INSERT INTO nags (
                        task,
                        notes,
                        start_time,
                        interval,
                        period,
                        user_id
                    )
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
                [nag.task, nag.notes, nag.startTime, nag.interval, nag.period, nag.userId]);
                
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}