const express = require('express');
const Route = express.Router();



Route.use('/upload', require('./upload'));
Route.use('/edit',  require('./edit'));
Route.use('/preset', require('./preset'));
Route.use('/filter', require('./filter'));


module.exports = Route;