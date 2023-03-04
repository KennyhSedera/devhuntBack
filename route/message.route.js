const express = require('express');
const app = express.Router()

const messageController =require('../controllers/message.controllers')
//message
app.get('/message',messageController.index)

app.post('/message', messageController.add)

app.get('/message/:idmessage',messageController.show)

app.put('/message', messageController.update)

app.delete('/message/:idmessage', messageController.delete)

module.exports = app