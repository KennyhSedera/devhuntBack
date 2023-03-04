const parcourController =require('./controllers/parcour.controllers')
//parcour
app.get('/parcour',parcourController.index)

app.post('/parcour',parcourControllerPolicy.isExist, parcourController.add)

app.get('/parcour/:idparcour',parcourController.show)

app.put('/parcour',parcourControllerPolicy.beforeUpdated,parcourController.update)

app.delete('/parcour/:idparcour',parcourControllerPolicy.isInDeclaration,parcourController.delete)