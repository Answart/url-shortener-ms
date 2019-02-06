'use strict';

require('dotenv').config();

const express    = require('express'),
  app            = express(),
  port           = process.env.PORT || 8000,
  expressLayouts = require('express-ejs-layouts'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash');


const db = require('./app/db')(process.env.MONGODB_URI);
const store = require('./app/store')(db.connection);

app.set('trust proxy', 1);
// Set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: 'my-super-secret',
  cookie: { maxAge: 6000 },
  resave: false, // forces session to be saved to store
  saveUninitialized: false, // dont save unmodified
  store
}));
app.use(function(req,res,next){
  if(!req.session){
    return next(new Error('Oh no! No session found.')) //handle error
  }
  next();
});
app.use(flash());

// Set public directories
app.use('/public', express.static(__dirname + '/public'));

// Set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set routes
app.use(require('./app/routes'));


app.listen(port, function() {
  console.log('Server running on port ' + port);
});