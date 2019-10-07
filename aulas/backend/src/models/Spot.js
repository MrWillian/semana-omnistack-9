const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  }
});

// Os Virtuals são campos que serão visíveis apenas para o JavaScript, eles não serão salvos 
// no bando de dados

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://192.168.1.115:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model('Spot', SpotSchema);
