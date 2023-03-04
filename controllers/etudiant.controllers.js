const Table = require('../models/index')
const Etudiant = Table.Etudiant
const Parcours = Table.Parcours

module.exports = {
   async add (req, res){
   await Etudiant.create(req.body)
        .then(data=> {
                res.send({
                    success:'Etudiant ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Etudiant "
              })
        })
    },
    async show (req, res){
        await  Etudiant.findOne({id_user:req.params.id_user})
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Etudiant " 
                   });
            })
    },
    async index (req,res){
        await Etudiant.findAll({
          include: Parcours
        })
        .then(data=>{
          res.send({Etudiant :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Etudiant.destroy({
          where:{
            id_user: req.params.id_user}
          })
         .then(data=>{
             res.send({success :'Etudiant supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Etudiant.update(req.body,{
                  where:{id_user:req.params.id_user}})
        .then(data=>{
           res.send({ success :'Etudiant modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Etudiant "});
         })   
    },
}