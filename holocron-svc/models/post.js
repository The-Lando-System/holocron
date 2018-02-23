var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
  id:       { type: String,   default: '' },
  title:    { type: String,   default: '' },
  date:     { type: String,   default: '' },
  content:  { type: String,   default: '' },
  path:     { type: String,   default: '' },
  name:     { type: String,   default: '' }
});