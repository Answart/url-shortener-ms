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

    delete newRet._id;
    delete newRet.__v;
    delete newRet.cuid;
    delete newRet.date_created;

    return newRet;
  },
};

// The pre-save hook method
// TODO: make sure that short_url is created from original_url
shortUrlSchema.pre('save', function saveHook(next) {
  const shortUrl = this;
  const stringey = createRandomString();
  const shortened = `${process.env.PUBLIC_URL}/s/${stringey}`;

  shortUrl.short_url = shortened;

  next();
});


module.exports = mongoose.model('ShortUrl', shortUrlSchema);
