const sessions = require('./sessions');

const handleSignin = (db, bcrypt, req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        //res.status(400).json('Invalid credentials');
        return Promise.reject('Invalid credentials');
    } 
    return db.select('email','hash').from('login')
        .where('email','=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email','=', email)
                    .then((user) => {
                        //delete user[0].email;
                        return user[0];
                    })
                    .catch((err) => Promise.reject('Error logging in'));
            } else {
                return Promise.reject('Wrong credentials');
            }
        })
        .catch((err) => Promise.reject('Wrong credentials'));

}

const signinAuthentification = (db, bcrypt) => (req,res) => {
    const { authorization } = req.headers;
    return authorization ? sessions.getAuthTokenId(req, res) : 
        handleSignin(db, bcrypt, req, res)
            .then(data => {
                return data.id && data.email ? sessions.createSessions(data) : Promise.reject(data);
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
}

module.exports = {
    signinAuthentification: signinAuthentification
};