const express = require('express');
const Route = express.Router();
const bodyParser = require('body-parser');
const User = require('./../../../models/User');

Route.use(bodyParser.json());


Route.get('/', async (req, res) => {  
  try{
    const userId = req.user.userId;
    let user = await User.findById(userId);
    if (!!!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json(user);
  }
  catch(e) {
    console.log(e)
    res.status(500).json( e );
  }
});

Route.put('/', async (req, res) => {
  try{
    const userId = req.user.userId;
    let body = req.body;
    let user = await User.findById(userId);
    if (!!!user && !!! body) {
      return res.status(401).json({ message: 'User not found' });
    }

    for (let userKey in user.toObject()) {
      if (user.toObject().hasOwnProperty(userKey)) {
        for (let bodyKey in body) {
          if (body.hasOwnProperty(bodyKey)) {
            user[bodyKey] = userKey === bodyKey? body[bodyKey] : user[bodyKey];
          }
        }
      }
    }
    user.save();

    res.json(user);
  }
  catch(e) {
    console.log(e)
    res.status(500).json( e );
  }
});

Route.delete('/', async (req, res) => {  
  try{
    const userId = req.user.userId;
    let user = await User.findByIdAndDelete(userId, function (err, docs) { 
      if (err){ 
        throw new Error(err.toString()); 
      } 

      res.json(docs);
    }); 
  }
  catch(e) {
    console.log(e)
    res.status(500).json( e );
  }
});

module.exports = Route;