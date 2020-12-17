const express = require('express');
const Route = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult, body} = require('express-validator');
const User = require('./../../../models/User');
const bodyParser = require('body-parser');

Route.use(bodyParser.json());

//Route.use(express.json({ extended: true }));

// /api/auth/login
Route.post('/',
  [
    check('email', 'Input correct E-mail').normalizeEmail().isEmail(),
    check('password', 'Input password').exists()
  ],
  async (req, res) => {
    try {
      console.log(req.body)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Uncorrect login data'
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User is not exists' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password, try again' });
      }
      const isAdmin = user.isAdmin, isSub = user.isSub;
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '24h' }
      );

      res.json({ token, userId: user.id, is: { isAdmin, isSub } });
    } 
    catch (e) {
      res.status(500).json({ message: 'Something wrong, please try again' });
    }
});

Route.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    var userMap = {};

    users.forEach((user) => {
      userMap[user._id] = user;
    });
    
    res.send(userMap); 
  });
});


module.exports = Route;