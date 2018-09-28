const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

// Since our router in app.js already points to /api, every call here is /api/hello and so on

router.get('/hello', apiController.greet);

router.post('/shorturl/new', apiController.createShortUrl);

router.get('/shorturl/:short_url', apiController.shortUrlDetails);

module.exports = router;