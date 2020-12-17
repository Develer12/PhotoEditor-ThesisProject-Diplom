const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
  presets: [{
		name: { type: String, unique: true },
		settings: { type: Object}
  }]
});

module.exports = model('Preset', schema);