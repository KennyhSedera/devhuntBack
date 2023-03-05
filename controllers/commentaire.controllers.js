const { Sequelize } = require('../models/index')
const Table = require('../models/index')
const Commentaire = Table.Commentaire
const Etudiant = Table.Etudiant
const Publication = Table.Publication
const Domaine = Table.Domaine
const Matiere = Table.Matiere

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
          include:[{model:Etudiant, attributes:['nom', 'prenom', 'matricule', 'photo_Profil']},{model:Publication, include:[Domaine, Matiere]}]
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
    },
    async countCommentaire (req, res){
      await Commentaire.findOne({
        where:req.body,
        attributes:[[Sequelize.fn('COUNT', Sequelize.col('id_commentaire')), 'nbrCommentairePub'], 'id_pub'],
        group:['id_pub']
      })
      .then((data) => {
        res.send({Commentaire: data})
      }).catch((err) => {
        res.send({error: err.message || "Une erreur se produite lors de la comptage commentaire"})
      });
    }
}