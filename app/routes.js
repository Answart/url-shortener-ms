const express = require('express');
const router = express.Router();
const mainController = require('./controllers/main.controller');
const eventsController = require('./controllers/events.controller');


router.get('/',      mainController.showHome);
router.get('/new/*', eventsController.showUrl);
router.get('*',      mainController.show404);


module.exports = router;