import express, { response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'; 
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfile } from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'smartbrain'}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000);

//root page get 
app.get('/', (req, res) => {
    res.send('success');
});

//signin in 
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});

//register
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});

//profile/:userID
app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)});

//image where rank changes based on that
app.put('/image', (req, res) => {handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {handleApiCall(req, res)});

//bcrypt for hashing passwords and then comparing them 

//handleImageCopy
// app.put('/image', (req, res) => {
//     const {id} = req.body;
//     db('users').where('id', '=', id)
//     .increment('entries', 1)
//     .returning('entries')
//     .then(entries => {
//         res.json(entries[0].entries); 
//     })
//     .catch(err => res.status(400).json('unable to get entries'))
// });























