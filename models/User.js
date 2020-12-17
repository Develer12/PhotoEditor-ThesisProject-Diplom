const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fName: { type: String, required: true },
  sName: { type: String, required: true },
  isAdmin: { type: Boolean },
  isSub: { type: Boolean },
  subDate: {type: Date, default: Date.now},
});

module.exports = model('User', schema);