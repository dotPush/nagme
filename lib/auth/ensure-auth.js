const jwt = require('./jwt');

module.exports = function checkAuth(req, res, next) {
    // skip auth logic if request is a 'DELETE via GET'
    // i.e. the user has hit the link to delete the task
    if (!req.url.includes('/api/delete/')) {
        const token = req.get('Authorization');
        if (!token) {
            res.status(401).json({ error: 'no authorization found' });
            return;
        }

        let payload = null;
        try {
            payload = jwt.verify(token);
        }
        catch (err) {
            res.status(401).json({ error: 'invalid token' });
            return;
        }

        req.userId = payload.id;
    }
    next();
};