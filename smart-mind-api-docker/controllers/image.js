const Clarifai = require('clarifai');
const apiKeys = require('../api-keys');

// initialize ai-api key
const appClarifai = new Clarifai.App({
    apiKey: apiKeys.ai.key //'YOUR_API_KEY'
   });

const handleApiCall = (req, res) => {
    appClarifai.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with api'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable getting entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};