const urlHelper = require('../helpers/url.helper');


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
        res.render('pages/home', { errors: [] });
      }
    });
  }

};
