const messageController =require('./controllers/message.controllers')
//message
app.get('/message',messageController.index)

app.post('/message',messageControllerPolicy.isExist, messageController.add)

app.get('/message/:idmessage',messageController.show)

app.put('/message',messageControllerPolicy.beforeUpdated,messageController.update)

app.delete('/message/:idmessage',messageControllerPolicy.isInDeclaration,messageController.delete)