const express = require('express');
const app = express.Router()

const reponseController =require('../controllers/reponse.controllers')
//reponse
app.get('/reponse',reponseController.index)

app.post('/reponse',reponseController.add)

app.put('/reponse/:id_reponse', reponseController.update)

app.delete('/reponse/:id_reponse', reponseController.delete)

module.exports = app