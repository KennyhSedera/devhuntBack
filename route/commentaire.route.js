const express = require('express');
const app = express.Router()

const commentaireController =require('../controllers/commentaire.controllers')
//commentaire
app.get('/commentaire/:id_pub',commentaireController.index)

app.post('/commentaire', commentaireController.add)

app.get('/commentaire/:id_commentaire',commentaireController.show)

app.put('/commentaire/:id_commentaire', commentaireController.update)

app.delete('/commentaire/:id_commentaire', commentaireController.delete)

module.exports = app