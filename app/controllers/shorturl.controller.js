const { ShortUrl } = require('../models');
const { isValidShortUrl, isValidUrl } = require('../utils');


function createShortUrl(req, res) {
  const original_url = req.params['0'];
  const validUrl = isValidUrl(original_url);

  function resError(message) {
    console.error(message);

    req.flash('errors', message);

    res.statusMessage = message;
    res.status(400).render('pages/home', {
      info: {},
      errors: req.flash('errors'),
    });
  }

  function resJson({ message, doc }) {
    console.info(message);

    req.flash('info', message);
    req.flash('success', doc);

    res.statusMessage = message;
    res.status(200).render('pages/home', {
      errors: [],
      info: {
        message: req.flash('info'),
        json: req.flash('success'),
      },
    });
  }

  if (!original_url) {
    resError(`Unable to parse url.`);
  }
  if (!validUrl) {
    resError(`Given url '${original_url}' is not a valid url to shorten.`);
  }

  // user give a previously created url?
  ShortUrl.findOne({ original_url }, (err, foundUrl) => {
    if (err) {
      resError(`An error occured while looking for the shortUrl of '${original_url}'. Try again. Error: ${err}`);
    } else if (!!foundUrl) {
      resJson({
        message: `A shortUrl already exists for '${original_url}' as '${foundUrl.short_url}'.`,
        doc: JSON.stringify(foundUrl.toJSON()),
      });
    } else {
      const url = new ShortUrl({ original_url });

      url.save((saveErr, createdUrl) => {
        if (saveErr) {
          resError(`An error occured while saving new shortUrl from '${original_url}'. Error: ${saveErr}`);
        } else if (!createdUrl) {
          resError(`An error occured while creating shortUrl from '${original_url}'.`);
        } else {
          resJson({
            message: `Created shortUrl '${createdUrl.short_url}' from shortUrl '${original_url}'.`,
            doc: JSON.stringify(createdUrl.toJSON()),
          });
        }
      });
    }
  });
}

function getShortUrl(req, res) {
  const short_url = req.params['0'];
  const fullPath = `${process.env.PUBLIC_URL}/s/${short_url}`;
  const validShortUrl = isValidShortUrl(short_url);

  function resError(message) {
    console.error(message);

    req.flash('errors', message);

    res.statusMessage = message;
    res.status(400).render('pages/home', {
      errors: req.flash('errors'),
    });
  }

  if (!short_url) {
    resError(`Unable to parse url.`);
  }
  if (!validShortUrl) {
    resError(`Given url '${short_url}' was not created here. Unknown route`);
  }

  // user give a shortUrl?
  ShortUrl.findOne({ short_url: fullPath }, (err, foundUrl) => {
    if (err) {
      resError(`An error occured while looking for the original url of shortUrl '${short_url}'. Try again. Error: ${err}`);
    } else if (!foundUrl || !foundUrl.original_url) {
      resError(`No url associated with the shortUrl '${fullPath}'.`);
    } else {
      console.log(`Found url '${foundUrl.original_url}' from shortUrl '${short_url}'. Redirecting user.`);
      res.status(200).redirect(foundUrl.original_url);
    }
  });
}


module.exports = {
  createShortUrl,
  getShortUrl,
};
