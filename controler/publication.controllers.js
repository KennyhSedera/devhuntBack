const Table = require('../models/models')
const Publication = Table.Publication

module.exports = {
   async add (req, res){
   await Publication.create(req.body)
        .then(data=> {
                res.send({
                    success:'Publication ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Publication "
              })
        })
    },
    async show (req, res){
        await  Publication.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Publication " 
                   });
            })
    },
    async index (req,res){
        await Publication.findAll()
        .then(data=>{
          res.send({Publication :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Publication.destroy({
          where:{
            id__Publication: req.params.idPublication}
          })
         .then(data=>{
             res.send({success :'Publication supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Publication.update(req.body.data,{
                  where:req.body.where})
        .then(data=>{
           res.send({ success :'Publication modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Publication "});
         })   
    }
}