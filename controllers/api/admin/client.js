const express = require('express');
const Route = express.Router();
const User = require('./../../../models/User');


Route.get('/all', (req, res) => {
  const userId = req.user.userId;

  User.find({}, (err, users) => {
    let userMap = [];

    users.map((elem) => {
      elem._id == userId? null : userMap.push(elem);
    });
    
    res.send(userMap); 
  });
});

Route.put('/permission', async (req, res) => {
  try{
    const userId = req.user.userId;
    let body = req.body;

    if(userId == body._id) {
      res.status(422).json({ message: 'You cannot change your own permissions' });
    }

    let user = await User.findById(body._id);
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