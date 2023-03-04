const publicationController =require('./controllers/publication.controllers')
//publication
app.get('/publication',publicationController.index)

app.post('/publication',publicationControllerPolicy.isExist, publicationController.add)

app.get('/publication/:idpublication',publicationController.show)

app.put('/publication',publicationControllerPolicy.beforeUpdated,publicationController.update)

app.delete('/publication/:idpublication',publicationControllerPolicy.isInDeclaration,publicationController.delete)