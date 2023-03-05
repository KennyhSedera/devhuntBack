const { Parcours, Annee, Niveau, Sequelize } = require('../models/index')
const Table = require('../models/index')
const Niveau_etudiant = Table.Niveau_etudiant
const Etudiant = Table.Etudiant

module.exports = {
   async add (req, res){
   await Niveau_etudiant.create(req.body)
        .then(data=> {
                res.send({
                    success:'Niveau_etudiant ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Niveau_etudiant "
              })
        })
    },
    async show (req, res){
        await  Niveau_etudiant.findOne({id: req.params.id})
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Niveau_etudiant " 
                   });
            })
    },
    async index (req,res){
        await Niveau_etudiant.findAll({
            include:[{model:Etudiant, include: Parcours}, Annee, Niveau],
            where:{id_niveau : req.params.id}
        })
        .then(data=>{
          res.send({Niveau_etudiant :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Niveau_etudiant.destroy({
          where:{ id: req.params.id }
          })
         .then(data=>{
             res.send({success :'Niveau_etudiant supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Niveau_etudiant.update(req.body,{
                  where:{id: req.params.id}})
        .then(data=>{
           res.send({ success :'Niveau_etudiant modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Niveau_etudiant "});
         })   
    },
    async countEtudientNIveau (req, res){
        await Niveau_etudiant.findAll({
            attributes:[[Sequelize.fn('COUNT', Sequelize.col('createdAt')), 'totalEtudientNiveau']],
            group:['id_niveau'],
            include:[Niveau],
        })
        .then((data) => {
            res.send({total:data})
        }).catch((err) => {
            res.send({error:err.message || "Une erreur se produite lors de la comptage d'etudient"})
        });
    },
    async getEtudientNIveau (req, res){
        await Niveau_etudiant.findAll({
            where:{id_niveau:req.params.id_niveau},
            order:['id_niveau'],
            include:[Niveau, {model:Etudiant, include:[Parcours]}],
        })
        .then((data) => {
            res.send({total:data})
        }).catch((err) => {
            res.send({error:err.message || "Une erreur se produite lors de la comptage d'etudient"})
        });
    },
}