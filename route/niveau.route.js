const niveauController =require('./controllers/niveau.controllers')
//niveau
app.get('/niveau',niveauController.index)

app.post('/niveau',niveauControllerPolicy.isExist, niveauController.add)

app.get('/niveau/:idniveau',niveauController.show)

app.put('/niveau',niveauControllerPolicy.beforeUpdated,niveauController.update)

app.delete('/niveau/:idniveau',niveauControllerPolicy.isInDeclaration,niveauController.delete)