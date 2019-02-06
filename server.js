'use strict';

require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./app/db')(process.env.MONGODB_URI);
const store = require('./app/store')(db.connection);
const routes = require('./app/routes');
const app = require('./app')(store);


// Set public directories
app.use('/public', express.static(__dirname + '/public'));

// Set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(routes);


app.listen(app.get('port'), app.get('host'), error => {
  console.log('Server running on port ' + app.get('port'));
});