const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const database  = {
    users: [
        {
            id: '123',
            name: 'Aman',
            email: 'amansigroha4@gmail.com',
            password: 'butterscotch',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Naman',
            email: 'Naman@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json(database.users[0]);
        }else {
            res.status(400).json('error logging in');
        }
})

app.post('/register',(req,res)=>{
    const {email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req,res)=>{
    const { id } = req.params;
    const user = database.users.find(user => user.id === id);
    if (user) {
        res.json(user);
    }else{
        res.status(400).json('no such user')
    }
})

app.put('/image',(req, res)=>{
    const { id } = req.body;
    const user = database.users.find(user => user.id === id);
    if (user) {
        user.entries++;
        res.json(user.entries);
    }else{
        res.status(404).json('no such user')
    }
})

app.listen(3001, ()=>{
    console.log('app is running on port 3001')
})