require('dotenv').config({ path: '../.env' });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const secret = process.env.SECRET || '';


module.exports = (store) => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 8000;
  app.set('host', host);
  app.set('port', port);
  app.set('trust proxy', 1);
  app.set('strict routing', true);

  // Set sessions and cookie parser
  app.use(cookieParser());
  app.use(session({
    secret,
    cookie: { maxAge: 6000 },
    resave: false, // forces session to be saved to store
    saveUninitialized: false, // dont save unmodified
    store,
  }));
  app.use((req, res, next) => {
    if (!req.session) {
      // handle error
      return next(new Error('Oh no! No session found.'));
    }

    return next();
  });
  app.use(flash());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  return app;
};
