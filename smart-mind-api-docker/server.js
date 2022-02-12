const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const signout = require('./controllers/signout');
const auth = require('./controllers/authorization');

// process vars
process.env.JWT_SECRET = process.env.JWT_SECRET || 'JWTSECRET';
// process.env.REDIS_URI = process.env.REDIS_URI || '127.0.0.1:6379';

const knexConfig = {
  client: 'pg',
  connection: {
    connectionString: process.env.POSTGRES_URI,
    // host : process.env.POSTGRES_HOST || '127.0.0.1',
    // user: process.env.POSTGRES_USER || '',
    // password: process.env.POSTGRES_PASSWORD || '',
    // database: process.env.POSTGRES_DB || 'smart-mind'
    // *ssl: true
  }
};

const db = knex(knexConfig);

// const whitelist = ['http://localhost:3001', 'http://localhost:3000'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }

// init express server
const app = express(),
    PORT = process.env.PORT || 3000;

// middleware: parsing the request body
app.use(express.json());
app.use(morgan('combined'));

// middleware: enable cors (Cross-Origin Resource Sharing)
//app.use(cors(corsOptions));
app.use(cors());

// routes
app.get('/', (req, res) => { 
res.send('server is working'); });
app.post('/signin', signin.signinAuthentification(db, bcrypt));
app.post('/signout', (req, res) => signout.handleSignout(req, res));
app.post('/register', register.registerAuthentification(db, bcrypt));
app.get('/profile/:id', auth.requireAuth , (req, res) => profile.handleProfileGet(req, res, db));
app.post('/profile/:id', auth.requireAuth , (req, res) => { profile.handleProfileUpdate(req, res, db)});
app.put('/image', auth.requireAuth , (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', auth.requireAuth, (req, res) => image.handleApiCall(req, res));

// start the server on port
app.listen(PORT, () => {
    console.log('server.js is running on port: '+ PORT);
});