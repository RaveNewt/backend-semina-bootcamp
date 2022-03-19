const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./app/api/v1/users/router');

const versionV1 = '/api/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',(req,res)=>{
    res.json({message:'Hello World'});
});
app.use(`${versionV1}`, usersRouter);

module.exports = app;
