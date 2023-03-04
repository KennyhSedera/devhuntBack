const commentaireController =require('./controllers/commentaire.controllers')
//commentaire
app.get('/commentaire',commentaireController.index)

app.post('/commentaire',commentaireControllerPolicy.isExist, commentaireController.add)

app.get('/commentaire/:idcommentaire',commentaireController.show)

app.put('/commentaire',commentaireControllerPolicy.beforeUpdated,commentaireController.update)

app.delete('/commentaire/:idcommentaire',commentaireControllerPolicy.isInDeclaration,commentaireController.delete)