const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');


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


function shortenUrl() {
  var num = Math.floor(100000 + Math.random() * 900000);
  return num.toString().substring(0, 4);
}

// middleware -----
// make sure that short_url is created from original_url
urlListSchema.pre('save', function(next) {
  this.short_url = process.env.APP_URL + '/' + shortenUrl();

  if (!user.cuid) {
    user.cuid = cuid();
  };

  next();
});


module.exports = urlListModel;