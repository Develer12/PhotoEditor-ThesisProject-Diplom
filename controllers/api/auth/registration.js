const express = require('express');
const Route = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('./../../../models/User');

// /api/auth/registration
Route.post(
    '/',
    [
      check('email', 'Wrong email').isEmail(),
      check('password', 'Min password length is 6').isLength({ min: 6 })
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Uncorrect registration data'
          });
        }
    
        const {email, password, fName, sName} = req.body;
        console.log(req.body)
    
        const candidate = await User.findOne({ email });
    
        if (candidate) {
          return res.status(400).json({ message: 'The same user already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword, isAdmin: false, fName, sName });
    
        await user.save();
    
        res.status(201).json({ message: 'User created' });
    
      } 
      catch (e) {
        res.status(500).json({ message: 'Wrong password, try again' });
      }
  });


module.exports = Route;