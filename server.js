// Load Environment Variables from the .env file
require('dotenv').config();
​
// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');
// Initiate database connection
client.connect();
​
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
            INSERT into users (email, password_hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});
​
// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data
​
// setup authentication routes
app.use('/api/auth', authRoutes);
​
// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);
​
// API Routes
​
// *** TODOS ***
app.get('/api/nags', async (req, res) => {
​
    try {
        const result = await client.query(`
            SELECT * FROM nags
            JOIN users
            WHERE user_id = $1;​
        `,
        [req.userId]);
​
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
​
});
​
// app.get('/api/lists', async (req, res) => {
// ​
//     try {
//         const result = await client.query(`
//             SELECT * FROM lists
//             WHERE user_id = $1
//             ORDER BY name ASC;
//         `,
//         [req.userId]);
// ​
//         res.json(result.rows);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: err.message || err
//         });
//     }
// ​
// });
​
app.post('/api/nags', async (req, res) => {
    const { nag } = req.body;
​
    try {
        const result = await client.query(`
        INSERT INTO nags (
            task,
            notes,
            start_time,
            interval,
            period,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,
    [nag.task, nag.notes, nag.startTime, nag.interval, nag.period, nag.userId]);
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});
​
// app.post('/api/lists', async (req, res) => {
//     const { name } = req.body;
//     //CDM
//     console.log(name);
//     try {
//         const result = await client.query(`
//             INSERT INTO lists (user_id, name)
//             VALUES ($1, $2)
//             RETURNING *;
//         `,
//         [req.userId, name]);
//         res.json(result.rows[0]);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: err.message || err
//         });
//     }
// });
​
// app.put('/api/todos/:id', async (req, res) => {
//     const id = req.params.id;
//     const { task, complete } = req.body;
// ​
//     try {
//         const result = await client.query(`
//         UPDATE todos
//         SET    task = $2,
//                complete = $3
//         WHERE  id = $1
//         RETURNING *;
//         `, [id, task, complete]);
     
//         res.json(result.rows[0]);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: err.message || err
//         });
//     }
// });
​
app.delete('/api/nags/:id', async (req, res) => {
    // get the id that was passed in the route:
    const id = req.params.id;
​
    try {
        const result = await client.query(`
            DELETE FROM nags
            WHERE  id = $1
            RETURNING *;
        `, [id]);
        
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});
​
// app.delete('/api/lists/:id', async (req, res) => {
//     // get the id that was passed in the route:
//     const id = req.params.id;
// ​
//     try {
//         const result = await client.query(`
//             DELETE FROM lists
//             WHERE  id = $1
//             RETURNING *;
//         `, [id]);
        
//         res.json(result.rows[0]);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: err.message || err
//         });
//     }
// });
​
// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});