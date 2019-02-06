const { MainController, EventsController } = require('./controllers');
const express = require('express');
const router = express.Router();

router.get('/',      MainController.showHome);
router.get('/new/*', EventsController.showUrl);
router.get('*',      EventsController.show404);

router.get('/',      mainController.showHome);
router.get('/new/*', eventsController.showUrl);
router.get('*',      mainController.show404);


module.exports = router;