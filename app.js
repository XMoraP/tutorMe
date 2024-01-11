// app.js

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const mysql = require('mysql2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
const registrationRouter = require('./routes/registration');
const filesRouter = require('./routes/files');
const profileRouter = require('./routes/profile');
const profileTutorRouter = require('./routes/profileTutor');
const tuteladosRouter = require('./routes/tutelados');
const tutorsRouter = require('./routes/tutors');
const chatRouter = require('./routes/chat');
const authController = require('./controllers/authController');

const db = require('./config/database');

const pool = mysql.createPool(db);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/registration', registrationRouter);
app.use('/chat', chatRouter);
app.use('/files', filesRouter);
app.use('/profile', profileRouter);
app.use('/tutelados', tuteladosRouter);
app.use('/tutors', tutorsRouter);
app.use('/profileTutor', profileTutorRouter);
app.use('/auth', authController);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Attach the pool to the request object
app.use((req, res, next) => {
    req.pool = pool;
    next();
});
  

module.exports = app;
