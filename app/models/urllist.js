const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');
const { createRandomString } = require('../utils');


const urlListSchema = new Schema({
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

const urlListModel = mongoose.model('UrlList', urlListSchema);


// middleware -----
// make sure that short_url is created from original_url
urlListSchema.pre('save', function(next) {
  this.short_url = process.env.APP_URL + '/' + createRandomString();

  if (!user.cuid) {
    user.cuid = cuid();
  };

  next();
});


module.exports = urlListModel;