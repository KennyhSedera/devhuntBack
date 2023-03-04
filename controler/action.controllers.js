const Table = require('../models/models')
const Action = Table.Action

module.exports = {
   async add (req, res){
   await Action.create(req.body)
        .then(data=> {
                res.send({
                    success:'Action ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Action "
              })
        })
    },
    async show (req, res){
        await  Action.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Action " 
                   });
            })
    },
    async index (req,res){
        await Action.findAll()
        .then(data=>{
          res.send({Action :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Action.destroy({
          where:{
            id__Action: req.params.idAction}
          })
         .then(data=>{
             res.send({success :'Action supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Action.update(req.body.data,{
                  where:req.body.where})
        .then(data=>{
           res.send({ success :'Action modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce action "});
         })   
    }
}