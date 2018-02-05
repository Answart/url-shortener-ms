const express       = require('express'),
  router            = express.Router()
  mainController    = require('./controllers/main.controller'),
  eventsController  = require('./controllers/events.controller');


router.get('/',      mainController.showHome);
router.get('/new/*', eventsController.showUrl);


router.get('*',      eventsController.show404);


module.exports = router;
