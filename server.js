'use strict';

require('dotenv').config();

const express    = require('express'),
  app            = express(),
  port           = process.env.PORT || 8000,
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash');


// Set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: 'my-super-secret',
  cookie: { maxAge: 6000 },
  resave: false, // forces session to be saved to store
  saveUninitialized: false // dont save unmodified
}));
app.use(flash());

// Set public directories
app.use('/public', express.static(__dirname + '/public'));

// Set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Connect to db
mongoose.connect(process.env.DB_URI);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set routes
app.use(require('./app/routes'));


app.listen(port, function() {
  console.log('Server running on port ' + port);
});
