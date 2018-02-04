const UrlList   = require('../models/urllist');
const urlHelper = require('../helpers/url.helper');


function parseDoc(urlList) {
  return {
    original_url: urlList.original_url,
    short_url: urlList.short_url
  };
}

function createShortUrl(url, cb) {
  var urlList = new UrlList({
    original_url: url
  })

  urlList.save((err, urlList) => {
    if (err) { throw err };

    cb(null, parseDoc(urlList));
  })
}


module.exports = {
  showUrl: (req, res) => {
    var paramUrl = req.params['0'];

    urlHelper.isValidUrl(paramUrl, (err, url) => {
      if (err) {
        req.flash('errors', err);

        res.render('pages/home', {
          errors: req.flash('errors')
        });
      } else {
        var isAppsShortenedUrl = urlHelper.isAppUrl(url);
        if (isAppsShortenedUrl) {
          UrlList.findOne({ short_url: url }, (err, urlList) => {
            if (err) { throw err };
            if (urlList) {

              res.redirect(urlList.original_url);
            } else {
              req.flash('errors', `'${url}' is not a valid shortened url. Try again.`);

              res.render('pages/home', {
                errors: req.flash('errors')
              });
            }
          })
        } else {
          UrlList.findOne({ original_url: url }, (err, urlList) => {
            if (err) { throw err };
            if (urlList) {

              res.json(parseDoc(urlList));
            } else {
              createShortUrl(url, (err, doc) => {
                if (err) { throw err };

                res.json(doc);
              })
            }
          })
        }
      }
    });
  }

};
