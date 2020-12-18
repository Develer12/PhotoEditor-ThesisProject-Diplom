const express = require('express');
const Route = express.Router();


Route.use('/info', require('./info'));


module.exports = Route;