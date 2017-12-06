const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

//on error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

//port number
const PORT = process.env.PORT || 7070;

//CORS middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//import users.js file
app.use('/users', users);

//index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//start server
app.listen(PORT, () => console.log(`You are on port: ${PORT}.`));
