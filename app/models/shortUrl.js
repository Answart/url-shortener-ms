const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');
const { createRandomString } = require('../utils');


const shortUrlSchema = new Schema({
  cuid:             { type: String, default: cuid(), required: true },

  original_url:     { type: String, required: true },
  short_url:        { type: String, required: false },

  date_created:     { type: 'Date', default: (new Date().toISOString()), required: true }
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// The pre-save hook method
// TODO: make sure that short_url is created from original_url
shortUrlSchema.pre('save', function(next) {
  this.short_url = process.env.PUBLIC_URL + '/s/' + createRandomString();

  if (!user.cuid) {
    user.cuid = cuid();
  };

  next();
});


module.exports = mongoose.model('ShortUrl', shortUrlSchema);