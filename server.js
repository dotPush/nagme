// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');
const Cron = require('cron').CronJob;
const handleNag = require('./cron/handle-nags');
const sendNags = handleNag.sendNags;
const updateRecurNags = handleNag.updateRecurNags;
const { getIdString } = require('./node-utils/getIdString');

// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, password_hash, display_name as "displayName" 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        console.log(user);
        return client.query(`
            INSERT into users (push_api_key, email, password_hash, display_name)
            VALUES ($1, $2, $3, $4)
            RETURNING id, push_api_key as "pushApiKey", email, display_name as "displayName";
        `,
        [user.pushApiKey, user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});
// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// API Routes
const logError = (res, err) => {
    console.log(err);
    res.status(500).json({ error: err.message || err });
};

// *** NAGS ***
app.get('/api/nags', async(req, res) => {
    try {
        const result = await client.query(`
            SELECT * FROM nags
            WHERE user_id = $1;
            `,
        [req.userId]);
        res.json(result.rows);
    }
    catch (err) {
        logError(res, err);
    }
});

app.post('/api/nags', async(req, res) => {
    const nag = req.body;
    try {
        const result = await client.query(`
        INSERT INTO nags (
            task,
            notes,
            start_time,
            interval,
            period,
            user_id,
            id_string
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `,
        [nag.task, nag.notes, nag.startTime, nag.interval, nag.period, req.userId, getIdString(30)]);
        res.json(result.rows[0]);
    }
    catch (err) {
        logError(res, err);
    }
});

app.get('/api/nags/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await client.query(`
        SELECT * FROM nags
        WHERE id = $1;
        `, [id]);
     
        res.json(result.rows);
    }
    catch (err) {
        logError(res, err);
    }
});

app.delete('/api/nags/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await client.query(`
            DELETE FROM nags
            WHERE id = $1
            RETURNING *;
        `, [id]);
        
        res.json(result.rows[0]);
    }
    catch (err) {
        logError(res, err);
    }
});

app.get('/api/delete/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await client.query(`
            DELETE FROM nags
            WHERE id = $1
            RETURNING *;
        `, [id]);
        
        res.json(result.rows[0]);
    }
    catch (err) {
        logError(res, err);
    }
});

app.get('/api/complete/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await client.query(`
            UPDATE nags
            SET complete = TRUE
            WHERE id = $1
            RETURNING *;
        `, [id]);
        
        res.json(result.rows[0]);
    }
    catch (err) {
        logError(res, err);
    }
});

// Cron to find and send nags
new Cron('* * * * *', sendNags, null, true, 'America/Los_Angeles');

// Cron to reset recurring nags one second after midnight
new Cron('1 0 0 * * *', updateRecurNags, null, true, 'America/Los_Angeles');

// listen for cron
app.listen('3128', () => {
    console.log('cron listening on 3128');
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});