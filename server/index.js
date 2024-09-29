const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crud');

//fetch data from the database
app.get('/', (req, res) => {
    UserModel.find({})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


//update data from the database
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id: id})  
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

//put
app.put('/updateUser/:id', (req, res) =>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, 
        {
            name: req.body.name, 
            email: req.body.email, 
            age: req.body.age})
    .then(user => res.json(user))
    .catch(err => res.json(err)); 
})


//delete data from the database


app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(user => res.json(user))
    .catch(err => res.json(err));
});


//insert data to the database
app.post('/create-users', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user)) 
    .catch(err => res.status(500).json(err)); 
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

