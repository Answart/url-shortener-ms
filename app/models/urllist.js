const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const urlListSchema = new Schema({
  original_url: String,
  short_url: String
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
  next();
});


module.exports = urlListModel;
