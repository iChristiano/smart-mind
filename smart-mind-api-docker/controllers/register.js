const sessions = require('./sessions');

const handleRegister = (db, bcrypt, req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    if (!email || !name || !password) {
        //res.status(400).json('Invalid credentials');
        return Promise.reject('Invalid credentials');
    } else {
        return db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date(),
                    })
                    .then(user => {
                        //delete user[0].email;
                        return user[0];
                    })
                    .catch((err) => {
                        return Promise.reject('Unable to register');
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch((err) => {
            res.status(400).json('unable to register')});
    }
};

const registerAuthentification = (db, bcrypt) => (req,res) => {
    return handleRegister(db, bcrypt, req, res)
            .then(data => {
                if (data.id && data.email) {
                    return sessions.createSessions(data);
                } else {
                    return Promise.reject(data);
                }
                //return data.id && data.email ? sessions.createSessions(data) : 
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json('Unable to register'));
}

module.exports = {
    registerAuthentification: registerAuthentification
};