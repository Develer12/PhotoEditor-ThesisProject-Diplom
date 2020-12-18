const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./../models/User');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const userId = req.user.userId;
    let user = await User.findById(userId);

    if (!!!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    else if(!!!user.isAdmin){
      return res.status(401).json({ message: 'No access without Admin privacy' });
    }
  
    next();
  } 
  catch (e) {
    res.status(401).json(e);
  }
}
