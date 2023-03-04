const Table = require('../models/models')
const Commentaire = Table.Commentaire

module.exports = {
   async add (req, res){
   await Commentaire.create(req.body)
        .then(data=> {
                res.send({
                    success:'Commentaire ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Commentaire "
              })
        })
    },
    async show (req, res){
        await  Commentaire.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Commentaire " 
                   });
            })
    },
    async index (req,res){
        await Commentaire.findAll()
        .then(data=>{
          res.send({Commentaire :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Commentaire.destroy({
          where:{
            id__Commentaire: req.params.idCommentaire}
          })
         .then(data=>{
             res.send({success :'Commentaire supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Commentaire.update(req.body.data,{
                  where:req.body.where})
        .then(data=>{
           res.send({ success :'Commentaire modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Commentaire "});
         })   
    }
}