const express = require('express');
const cors = require('cors');
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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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

const ports = process.env.PORT || 4000;

app.listen(ports, ()=>{
    console.log('app is running on port ${ports}')
})