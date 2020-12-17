const express = require('express');
const Route = express.Router();
const auth = require('./../../middleware/auth');

Route.use('/auth', require('./auth'));
Route.use('/editor', 
auth,  
require('./editor'));


module.exports = Route;