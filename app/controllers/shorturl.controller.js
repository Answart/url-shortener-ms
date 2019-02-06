const { ShortUrl } = require('../models');
const { isValidShortUrl, isValidUrl } = require('../utils');


function createShortUrl(req, res) {
  const original_url = req.params['0'];
  const validUrl = isValidUrl(original_url);

  function returnHome(message) {
    req.flash('errors', message);

    console.error(message);
    res.statusMessage = message;
    res.status(400).render('pages/home', {
      errors: req.flash('errors')
    });
  }

  if (!validUrl) {
    returnHome(`Given url '${original_url}' is not a valid url to shorten.`);
  }

  // user give a previously created url?
  ShortUrl.findOne({ original_url }, (err, foundUrl) => {
    if (err) {
      returnHome(`An error occured while looking for the shortUrl of '${original_url}'. Try again. Error: ${err}`);
    } else if (!!foundUrl) {
      console.log(`A shortUrl already exists for '${original_url}' as '${foundUrl.short_url}'.`)
      res.status(200).json(foundUrl.toJSON());
    } else {
      const url = new ShortUrl({ original_url });

      url.save((err, createdUrl) => {
        if (err) {
          returnHome(`An error occured while saving new shortUrl from '${original_url}'. Error: ${err}`);
        } else if (!createdUrl) {
          returnHome(`An error occured while creating shortUrl from '${original_url}'.`);
        } else {
          console.log(`Created shortUrl '${createdUrl.short_url}' from shortUrl '${original_url}'.`)
          res.status(200).json(createdUrl.toJSON());
        }
      })
    }
  })
};

function getShortUrl(req, res) {
  const short_url = req.params['0'];
  const fullPath = `${process.env.PUBLIC_URL}/s/${short_url}`;
  const validShortUrl = isValidShortUrl(short_url);

  function returnHome(message) {
    req.flash('errors', message);

    console.error(message);
    res.statusMessage = message;
    res.status(400).render('pages/home', {
      errors: req.flash('errors')
    });
  }

  if (!validShortUrl) {
    returnHome(`Given url '${short_url}' was not created here. Unknown route`);
  }

  // user give a shortUrl?
  ShortUrl.findOne({ short_url: fullPath }, (err, foundUrl) => {
    if (err) {
      returnHome(`An error occured while looking for the original url of shortUrl '${short_url}'. Try again. Error: ${err}`);
    } else if (!foundUrl || !foundUrl.original_url) {
      returnHome(`No url associated with the shortUrl '${fullPath}'.`);
    } else {
      console.log(`Found url '${foundUrl.original_url}' from shortUrl '${short_url}'. Redirecting user.`)
      res.status(200).redirect(foundUrl.original_url);
    }
  })
};


module.exports = {
  createShortUrl,
  getShortUrl
};