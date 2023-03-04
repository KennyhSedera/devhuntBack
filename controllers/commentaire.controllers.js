const Table = require('../models/index')
const Commentaire = Table.Commentaire
const Etudiant = Table.Etudiant
const Publication = Table.Publication

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
      await  Commentaire.findOne({id_commentaire:req.id_commentaire})
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
        await Commentaire.findAll({
          where:{id_pub: req.params.id_pub},
          include:[Etudiant,Publication]
        })
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
          where:{ id_commentaire: req.params.id_commentaire}})
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
        await Commentaire.update({contenue:req.body.contenue},{
                  where:{id_commentaire:req.params.id_commentaire}})
        .then(data=>{
           res.send({ success :'Commentaire modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Commentaire "});
         })   
    }
}