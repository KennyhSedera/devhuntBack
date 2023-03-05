const express = require('express');
const app = express.Router()

const messageController = require('../controllers/message.controllers')
//message
app.get('/message/:id_user',messageController.index)

app.get('/message/:id_usersend/:id_userreceive',messageController.getMessage)

app.post('/message', messageController.add)

app.delete('/message/:id_message', messageController.delete)

module.exports = app