var mongoose = require('mongoose');

var GrudgeSchema = new mongoose.Schema({
  offender: {
    type: String,
    required: true
  },
  offense: {
    type: String,
    required: true
  },
  forgiven: {
    type: Boolean,
    required: true,
    default: false
  }
})

var Grudge = mongoose.model('Grudge', GrudgeSchema);


var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grudges: [{type: mongoose.Schema.Types.ObjectId, ref: 'Grudge'}]
})

var User = mongoose.model('User', UserSchema);

module.exports = {
  Grudge: Grudge,
  User: User
};