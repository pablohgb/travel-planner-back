const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.body.token;
    const token = authHeader;
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
function authenticateTokenParams(req, res, next) {
    const authHeader = req.params.token;
    const token = authHeader;
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

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user;
    next();
}

module.exports = { authenticateToken, authenticateTokenParams, getUser };
