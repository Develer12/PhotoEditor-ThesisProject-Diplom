const express = require('express');
const Route = express.Router();
const bodyParser = require('body-parser');

Route.use(bodyParser.json());


Route.use('/client', require('./client'));


module.exports = Route;