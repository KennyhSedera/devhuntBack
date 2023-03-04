const Table = require('../models/index')
const Domaine = Table.Domaine

module.exports = {
   async add (req, res){
   await Domaine.create(req.body)
        .then(data=> {
                res.send({
                    success:'Domaine ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Domaine "
              })
        })
    },
    async show (req, res){
        await  Domaine.findOne({id_domaine:req.params.id_domaine})
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Domaine " 
                   });
            })
    },
    async index (req,res){
        await Domaine.findAll()
        .then(data=>{
          res.send({Domaine :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Domaine.destroy({
          where:{
            id_domaine: req.params.id_domaine}
          })
         .then(data=>{
             res.send({success :'Domaine supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Domaine.update(req.body,{
                  where:{id_domaine:req.params.id_domaine}})
        .then(data=>{
           res.send({ success :'Domaine modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Domaine "});
         })   
    }
}