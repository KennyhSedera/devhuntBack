const Table = require('../models/index')
const Anneeuniv = Table.Annee

module.exports = {
   async add (req, res){
   await Anneeuniv.create(req.body)
        .then(data=> {
                res.send({
                    success:'Anneeuniv ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Anneeuniv "
              })
        })
    },
    async show (req, res){
        await  Anneeuniv.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Anneeuniv " 
                   });
            })
    },
    async index (req,res){
        await Anneeuniv.findAll()
        .then(data=>{
          res.send({Anneeuniv :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Anneeuniv.destroy({
          where:{
            id__Anneeuniv: req.params.idAnneeuniv}
          })
         .then(data=>{
             res.send({success :'Anneeuniv supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Anneeuniv.update(req.body,{ where:{id_annee: req.params.id_annee} })
        .then(data=>{
           res.send({ success :'Anneeuniv modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Anneeuniv "});
         })   
    }
}