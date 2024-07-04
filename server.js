const express = require('express');
const cors = require('cors');
//const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const id = require('./controllers/id');
const image = require('./controllers/image');
const saltRounds = 10;
const bcrypt = require('bcryptjs');


const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'aman',
      database: 'face-detection-database',
    },
  });


const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req, res)=>{
    res.send('success');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, saltRounds)});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, saltRounds)});

app.get('/profile/:id', (req, res) => { id.id(req, res, db)});

app.put('/image',(req, res)=>{ image.image(req, res, db)});

app.listen(process.env.PORT || 3001, ()=>{
    console.log('app is running on port ${process.env.PORT}')
})