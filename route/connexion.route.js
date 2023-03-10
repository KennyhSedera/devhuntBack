const express = require('express')
const app = express.Router()


app.post('connexion')
app.post('historique-connexion')
app.put('connexion')
app.post('action')

module.exports = app