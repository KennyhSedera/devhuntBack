const Table = require('../models/index')
const Matier = Table.Matiere

module.exports = {
   async add (req, res){
   await Matier.create(req.body)
        .then(data=> {
                res.send({
                    success:'Matier ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Matier "
              })
        })
    },
    async show (req, res){
        await  Matier.findOne({id_matier:req.params.id_matier})
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Matier " 
                   });
            })
    },
    async index (req,res){
        await Matier.findAll()
        .then(data=>{
          res.send({Matiere :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Matier.destroy({
          where:{
            id_matier: req.params.id_matier}
          })
         .then(data=>{
             res.send({success :'Matier supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Matier.update(req.body,{
                  where:{id_matier:req.params.id_matier}})
        .then(data=>{
           res.send({ success :'Matier modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Matier "});
         })   
    }
}