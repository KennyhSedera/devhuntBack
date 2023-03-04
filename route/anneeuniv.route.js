const anneeunivController =require('./controllers/anneeuniv.controllers')
//anneeuniv
app.get('/anneeuniv',anneeunivController.index)

app.post('/anneeuniv',anneeunivControllerPolicy.isExist, anneeunivController.add)

app.get('/anneeuniv/:idanneeuniv',anneeunivController.show)

app.put('/anneeuniv',anneeunivControllerPolicy.beforeUpdated,anneeunivController.update)

app.delete('/anneeuniv/:idanneeuniv',anneeunivControllerPolicy.isInDeclaration,anneeunivController.delete)