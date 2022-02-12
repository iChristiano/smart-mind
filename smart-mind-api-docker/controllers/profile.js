
const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err => res.status(400).json('Error getting user'));
}

const handleProfileUpdate = (req, res, db) => {
    const { id } = req.params;
    const { name, email, age } = req.body.formInput;

    db.transaction(trx => {
        const queries = [];

        const queryLogin = db('login')
            .where({ id })
            .update({ email: email})
            .transacting(trx);
        queries.push(queryLogin);

        const queryUsers = db('users')
            .where({ id })
            .update({ name: name, email: email, age: age })
            .transacting(trx);
        queries.push(queryUsers);
    
        Promise.all(queries)
            .then(trx.commit) 
            .then(resp => {
                if(resp) {
                    res.json('Success db update');
                } else {
                    res.status(400).json('Unable to update')
                }
            })
            .catch(err => {
                trx.rollback;
                res.status(400).json('Error update user');
            });
    });
    
    // db('users')
    //     .where({ id })
    //     .update({ name: name, email: email, age: age })
    //     .then(resp => {
    //         if(resp) {
    //             res.json('Success db update');
    //         } else {
    //             res.status(400).json('Unable to update')
    //         }
    //     })
    //     .catch(err => {
    //         res.status(400).json('Error update user');
    //     });
}

module.exports = {
    handleProfileGet: handleProfileGet,
    handleProfileUpdate: handleProfileUpdate
};