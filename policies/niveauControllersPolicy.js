const Table =require('../models/index')
const niveau  = Table.Niveau
const etudiant = Table.Etudiant
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        niveau.findOne({where:{libelle_niveau :req.body.libelle_niveau}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`Le niveau : "${data.libelle_niveau}" est déjà enregistré dans la base des données`
                        })
                  } else{
                    next()
                  }
        })
        .catch(err=>{
                res.status(500).send({
                   error:  err.message || "Une erreur se produite lors de la recherche de ce niveau " 
                  });
        })
   },
   beforeUpdated(req, res,next){
    niveau.findOne({where:{
          id_niveau:{
               [Opt.not]:req.params.id_niveau
          },
          libelle_niveau : req.body.libelle_niveau
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`Le niveau : "${data.libelle_niveau}" est déjà enregistrée dans la base des données`
               })
           } else{
            next()
         } 
        })
        .catch(err=>{
            res.status(500).send({
               error:
             err.message || "Une erreur se produite lors de la recherche de ce niveau " 
              });

        })
    },
   isInetudiant (req, res,next){
     etudiant.findOne({where:{id_niveau: req.params.id_niveau}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`Le niveau : "${data.libelle_niveau}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
           }) 
        } else{
            next()
        } 

        })
        .catch(err=>{
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce niveau " 
              });

        })
  },
}