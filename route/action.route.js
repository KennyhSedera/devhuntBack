const actionController =require('./controllers/action.controllers')
//action
app.get('/action',actionController.index)

app.post('/action',actionControllerPolicy.isExist, actionController.add)

app.get('/action/:idaction',actionController.show)

app.put('/action',actionControllerPolicy.beforeUpdated,actionController.update)

app.delete('/action/:idaction',actionControllerPolicy.isInDeclaration,actionController.delete)