const mongoose = require('mongoose');
const { Schema } = mongoose;
const cuid = require('cuid');
const { createRandomString } = require('../utils');


const shortUrlSchema = new Schema({
  cuid:             { type: String, default: cuid(), required: true },

  original_url:     { type: String, required: true },
  short_url:        { type: String, required: false },

  date_created:     { type: 'Date', default: (new Date().toISOString()), required: true },
});

// Schema options method to allow .toJSON fn on returned docs
shortUrlSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    const newRet = ret;

    newRet.id = ret._id;
    delete newRet._id;
    delete newRet.__v;
    delete newRet.cuid;
    delete newRet.date_created;
    delete newRet.id;

    return newRet;
  },
};

// The pre-save hook method
// TODO: make sure that short_url is created from original_url
shortUrlSchema.pre('save', (next) => {
  const shortUrl = this;

  const shortened = `${process.env.PUBLIC_URL}/s/${createRandomString()}`;
  shortUrl.short_url = shortened;

  if (!shortUrl.cuid) {
    shortUrl.cuid = cuid();
  }

  next();
});


module.exports = mongoose.model('ShortUrl', shortUrlSchema);
