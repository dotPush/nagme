const client = require('../lib/client');

run();

async function run() {

    try {    
        await client.query(`
            DROP TABLE IF EXISTS nags;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS users;
        `);

        console.log('drop tables complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}