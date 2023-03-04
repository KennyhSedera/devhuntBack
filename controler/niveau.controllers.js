const Table = require('../models/models')
const Niveau = Table.Niveau

module.exports = {
   async add (req, res){
   await Niveau.create(req.body)
        .then(data=> {
                res.send({
                    success:'Niveau ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Niveau "
              })
        })
    },
    async show (req, res){
        await  Niveau.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Niveau " 
                   });
            })
    },
    async index (req,res){
        await Niveau.findAll()
        .then(data=>{
          res.send({Niveau :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Niveau.destroy({
          where:{
            id__Niveau: req.params.idNiveau}
          })
         .then(data=>{
             res.send({success :'Niveau supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Niveau.update(req.body.data,{
                  where:req.body.where})
        .then(data=>{
           res.send({ success :'Niveau modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Niveau "});
         })   
    }
}