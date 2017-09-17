const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=> {
    console.log('Connected to database: ' + config.database);
});

mongoose.connection.on('error', (err)=> {
    console.log('Database erroe: ' + err);
});

const app = express();
const users = require('./routes/users');
const port = 3000;

app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('invalid endpoint');
})

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
    console.log('server started on port:' + port);
})