const express = require('express');
const bodyParser = require('body-parser');
const Route = express.Router();

Route.use(bodyParser.urlencoded({ extended: true }));

Route.use('/login', require('./login'));
Route.use('/registration', require('./registration'));
Route.use('/token', require('./token'));


module.exports = Route;