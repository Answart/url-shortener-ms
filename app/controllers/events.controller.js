const UrlList   = require('../models/urllist');
const urlHelper = require('../helpers/url.helper');


function createShortUrl(url, cb) {
  var urlList = new UrlList({
    original_url: url
  })

  urlList.save((err, urlList) => {
    if (err) { throw err };

    cb(null, urlList);
  })
}

function show404(req, res) {
  req.flash('errors', 'The route you entered does not exist.');

  res.render('pages/home', {
    errors: req.flash('errors')
  });
}


module.exports = {
  show404: show404,
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
      UrlList.findOne({ short_url: url }, (err, urlList) => {
        if (err) { throw err };
        if (urlList) {
          res.redirect(urlList.original_url);
        } else {
          returnHome(`'${url}' is not a valid shortened url. Try again.`)
        }
      })
    } else {
      if (!isValidUrl) {
        returnHome(`'${url}' is not a valid url. Try again.`)
      } else {
        UrlList.findOne({ original_url: url }, (err, urlList) => {
          if (err) { throw err };
          if (urlList) {

            res.json(urlList.toJSON());
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
