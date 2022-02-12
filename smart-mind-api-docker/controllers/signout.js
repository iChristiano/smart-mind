//const { redisClient } = require('./sessions');
const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URI);

const removeAuthTokenId = async (req, res) => {
    const { authorization } = req.headers;
    return redisClient.del(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorized')
        }
        return res.json({authorization: false});
    } )
}

const handleSignout = (req, res) => {
    removeAuthTokenId(req, res);
}

module.exports = {
    handleSignout: handleSignout
};