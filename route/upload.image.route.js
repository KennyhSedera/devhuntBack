const express = require('express');
const app = express.Router();

const imageController = require('../controllers/images.controller');

app.post('/upload',imageController.upload)

app.get('/files',imageController.getListFiles)

app.get('/files/:name',imageController.download)

module.exports = app
