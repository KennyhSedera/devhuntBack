const Table =require('../models/index')
const anneeuniv  = Table.Annee
const etudiant = Table.Etudiant
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        anneeuniv.findOne({where:{annee1 :req.body.annee1}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`Le anneeuniv : "${data.annee1}" est déjà enregistré dans la base des données`
                        })
                  } else{
                    next()
                  }
        })
        .catch(err=>{
                res.status(500).send({
                   error:  err.message || "Une erreur se produite lors de la recherche de ce anneeuniv " 
                  });
        })
   },
   beforeUpdated(req, res,next){
    anneeuniv.findOne({where:{
          id_annee:{
               [Opt.not]:req.params.id_annee
          },
          annee1 : req.body.annee1
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`Le anneeuniv : "${data.annee1}" est déjà enregistrée dans la base des données`
               })
           } else{
            next()
         } 
        })
        .catch(err=>{
            res.status(500).send({
               error:
             err.message || "Une erreur se produite lors de la recherche de ce anneeuniv " 
              });

        })
    },
   isInetudiant (req, res,next){
     etudiant.findOne({where:{anneeuniv_id: req.params.refanneeuniv}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`Le anneeuniv : "${data.annee1}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
           }) 
        } else{
            next()
        } 

        })
        .catch(err=>{
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce anneeuniv " 
              });

        })
  },
}