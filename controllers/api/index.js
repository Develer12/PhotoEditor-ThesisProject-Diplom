const express = require('express');
const Route = express.Router();
const auth = require('./../../middleware/auth');
const admin = require('./../../middleware/admin');

Route.use('/auth', require('./auth'));
Route.use('/editor', auth, require('./editor'));
Route.use('/account', auth, require('./account'));
Route.use('/admin', auth, admin, require('./admin'));


module.exports = Route;