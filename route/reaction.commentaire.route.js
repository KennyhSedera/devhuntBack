const express = require('express');
const app = express.Router()

const reactionController = require('../controllers/reaction.commentaire.controllers')
//reaction
app.get('/reaction/:id', reactionController.index)

app.post('/reaction', reactionController.add)

app.put('/reaction/:id', reactionController.update)

app.delete('/reaction/:id', reactionController.delete)

app.get('/count/:id' , reactionController.countReaction)

module.exports = app