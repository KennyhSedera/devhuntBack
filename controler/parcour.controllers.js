const Table = require('../models/models')
const Parcour = Table.Parcour

module.exports = {
   async add (req, res){
   await Parcour.create(req.body)
        .then(data=> {
                res.send({
                    success:'Parcour ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Parcour "
              })
        })
    },
    async show (req, res){
        await  Parcour.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Parcour " 
                   });
            })
    },
    async index (req,res){
        await Parcour.findAll()
        .then(data=>{
          res.send({Parcour :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Parcour.destroy({
          where:{
            id__Parcour: req.params.idParcour}
          })
         .then(data=>{
             res.send({success :'Parcour supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Parcour.update(req.body.data,{
                  where:req.body.where})
        .then(data=>{
           res.send({ success :'Parcour modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Parcour "});
         })   
    }
}