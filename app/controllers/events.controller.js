const ShortUrl = require('../models/shortUrl');
const urlHelper = require('../helpers/url.helper');


function createShortUrl(original_url, cb) {
  var shortUrl = new ShortUrl({
    original_url
  })

  shortUrl.save((err, urlDoc) => {
    if (err) { throw err };

    cb(null, urlDoc);
  })
}


module.exports = {
  showUrl: (req, res) => {
    var url = req.params['0'];
    var isAppsShortenedUrl = urlHelper.isAppUrl(url);
    var isValidUrl = urlHelper.isValidUrl(url);

    function returnHome(err) {
      req.flash('errors', err);

      res.render('pages/home', {
        errors: req.flash('errors')
      });
    }

    if (isAppsShortenedUrl) {
      ShortUrl.findOne({ short_url: url }, (err, urlDoc) => {
        if (err) { throw err };
        if (urlDoc) {
          res.redirect(urlDoc.original_url);
        } else {
          returnHome(`'${url}' is not a valid shortened url. Try again.`)
        }
      })
    } else {
      if (!isValidUrl) {
        returnHome(`'${url}' is not a valid url. Try again.`)
      } else {
        ShortUrl.findOne({ original_url: url }, (err, urlDoc) => {
          if (err) { throw err };
          if (urlDoc) {

            res.json(urlDoc.toJSON());
          } else {
            createShortUrl(url, (err, doc) => {
              if (err) { throw err };

              res.json(doc.toJSON());
            })
          }
        })
      }
    }
  }

};