const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.body.token;
    const token = authHeader;
    console.log("caca")
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, info) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.info = info;
        next();
    });
}

module.exports = authenticateToken;
