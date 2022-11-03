var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * User Schema
 */
var userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name not provided "],
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);