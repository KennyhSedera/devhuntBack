const Table =require('../models/models')
const parcour  = Table.Parcour
const etudiant = Table.Etudiant
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        parcour.findOne({where:{libelle_parcour:req.body.libelle_parcour}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`Le parcour : "${data.libelle_parcour}" est déjà enregistré dans la base des données`
                        })
                  } else{
                    next()
                  }
        })
        .catch(err=>{
                res.status(500).send({
                   error:  err.message || "Une erreur se produite lors de la recherche de ce parcour " 
                  });
        })
   },
   beforeUpdated(req, res,next){
    parcour.findOne({where:{
                            ref_parcour:{
                                    [Opt.not]:req.body.where.ref_parcour
                                  },
                            libelle_parcour : req.body.data.libelle_parcour
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`Le parcour : "${data.libelle_parcour}" est déjà enregistrée dans la base des données`
               })
           } else{
            next()
         } 
        })
        .catch(err=>{
            res.status(500).send({
               error:
             err.message || "Une erreur se produite lors de la recherche de ce parcour " 
              });

        })
    },
   isInetudiant (req, res,next){
     etudiant.findOne({where:{parcour_id: req.params.ref_parcour}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`Le parcour : "${data.libelle_parcour}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
           }) 
        } else{
            next()
        } 

        })
        .catch(err=>{
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce parcour " 
              });

        })
  },
}