const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

// Since our router in app.js already points to /api, every call here is /api/hello and so on

app.get('/hello', apiController.greet);

app.post('/shorturl/new', apiController.createUrl);

app.get('/shorturl/:short_url',apiController.shortenUrl);