require('dotenv').config();
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
      ssl: { rejectUnauthorized: false },
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

app.get('/db-test', async (req, res) => {
  try {
      const result = await db.raw('SELECT 1+1 AS result');
      res.json({ success: true, result: result.rows[0].result });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
  }
});


const ports = process.env.PORT || 4000;

app.listen(ports, ()=>{
    console.log('app is running on port ${ports}')
})