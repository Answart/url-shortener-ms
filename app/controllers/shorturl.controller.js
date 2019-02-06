const { ShortUrl } = require('../models');
const { isValidShortUrl, isValidUrl } = require('../utils');


function showUrl(req, res) {
  var url = req.params['0'];
  var isAppsShortenedUrl = isValidShortUrl(url);
  var validUrl = isValidUrl(url);

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
    if (!validUrl) {
      returnHome(`'${url}' is not a valid url. Try again.`)
    } else {
      ShortUrl.findOne({ original_url: url }, (err, urlDoc) => {
        if (err) { throw err };
        if (urlDoc) {

          res.json(urlDoc.toJSON());
        } else {
          var shortUrl = new ShortUrl({
            original_url: url
          })

          shortUrl.save((err, urlDoc) => {
            if (err) { throw err };

            res.json(doc.toJSON());
          })
        }
      })
    }
  }
};


module.exports = {
  showUrl
};