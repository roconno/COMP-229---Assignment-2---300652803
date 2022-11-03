var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * contact Schema
 */
var contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Contact', contactSchema);
