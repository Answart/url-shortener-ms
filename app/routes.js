const { MainController, ShortUrlController } = require('./controllers');
const express = require('express');
const router = express.Router();


router.get('/',                   MainController.showHome);
router.get('/new/*',              ShortUrlController.showUrl);
router.get('/s/*',                ShortUrlController.showUrl);
router.get('/*',                  MainController.show404);

module.exports = router;