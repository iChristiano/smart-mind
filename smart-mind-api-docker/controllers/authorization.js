//const { redisClient } = require('./sessions');
const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URI);

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Unauthorized');
    }
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('Unauthorized');
        }
        return next();
    })
}

module.exports = {
    requireAuth: requireAuth
};