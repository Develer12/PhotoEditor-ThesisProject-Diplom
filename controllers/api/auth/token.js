const express = require('express');
const Route = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('./../../../middleware/auth');


// /api/auth/token/update
Route.post('/update', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    const token = jwt.sign(
      { userId },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    );

    res.json({ token, userId });
  } 
  catch (e) {
    res.status(500).json({ message: 'Something wrong, please try again' });
  }
});


module.exports = Route;