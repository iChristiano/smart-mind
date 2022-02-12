const jwt = require('jsonwebtoken');
const Redis = require('ioredis');

// const redisClient = new Redis(
//     process.env.REDIS_URL + ":" + process.env.REDIS_PORT 
// );

const redisClient = new Redis(process.env.REDIS_URI);

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorized')
        }
        return res.json({id: reply});
    } )
}

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2 days'});
}

const setToken = async (tokenKey, idValue) => {
    return await redisClient.set(tokenKey, idValue);
}

const createSessions = async (user) => {
    //JWT token, return user data
    const { email, id } = user;
    const token = signToken(email);
    try {
        await setToken(token, id);
        return { success: true, userId: id, token: token};
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAuthTokenId: getAuthTokenId,
    createSessions: createSessions,
    redisClient: redisClient
};