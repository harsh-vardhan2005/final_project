const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'your_jwt_secret_key';

mongoose.connect('mongodb://127.0.0.1:27017/shanksxz');

// Middleware
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({ id: user._id, username: user.name }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ msg: 'user exists and password is correct', token });
            return;
        } else {
            res.status(401).send({ msg: 'user exists but password is incorrect' });
            return;
        }
    }

    res.status(404).send({ msg: 'user does not exist' });
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ name: username });
    if (user) {
        res.status(409).send({ msg: 'user already exists' });
        return;
    }
    const response = await User.create({
        name: username,
        password: password,
    });
    res.status(201).send({ msg: 'user created' });
});

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(4003, () => {
    console.log('server started');
});
