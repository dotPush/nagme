const jwt = require('./jwt');

module.exports = function checkAuth(req, res, next) {
    // skip auth logic if request is a 'DELETE via GET'
    // i.e. the user has hit the link to delete the task
    // trying to figure out if this means an unauthenticaed request can delete a nag
    if (!(req.url.includes('/delete/') || req.url.includes('/complete/'))) {
        const token = req.get('Authorization');
        if (!token) {
            //res.status(401).json({ error: 'no authorization found' });
            res.status(401).json({ error: req.url });
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