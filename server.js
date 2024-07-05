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
      host: 'dpg-cq3b79bqf0us73deeoa0-a.oregon-postgres.render.com',
      port: 5432,
      user: 'face_detection_database_version_1_user',
      password: 'uc5abmKPV5xm7Z14j6fCYd1oyUy1qwFO',
      database: 'face_detection_database_version_1',
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

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log('app is running on port ${port}')
})