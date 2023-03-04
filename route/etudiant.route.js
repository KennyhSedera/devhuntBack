const etudiantController =require('./controllers/etudiant.controllers')
//etudiant
app.get('/etudiant',etudiantController.index)

app.post('/etudiant',etudiantControllerPolicy.isExist, etudiantController.add)

app.get('/etudiant/:idetudiant',etudiantController.show)

app.put('/etudiant',etudiantControllerPolicy.beforeUpdated,etudiantController.update)

app.delete('/etudiant/:idetudiant',etudiantControllerPolicy.isInDeclaration,etudiantController.delete)