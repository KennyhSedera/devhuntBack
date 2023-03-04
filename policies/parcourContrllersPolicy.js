const Table =require('../models/index')
const parcour  = Table.Parcours
const etudiant = Table.Etudiant
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        parcour.findOne({where:{libelle_parcours:req.body.libelle_parcours}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`Le parcour : "${data.libelle_parcours}" est déjà enregistré dans la base des données`
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
     console.log({id_parcours:req.params.id_parcours});
     parcour.findOne({where:{
          id_parcours:{
               [Opt.not]:req.params.id_parcours
          },
          libelle_parcours : req.body.libelle_parcours
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`Le parcour : "${data.libelle_parcours}" est déjà enregistrée dans la base des données`
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
     etudiant.findOne({where:{parcour_id: req.params.id_parcours}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`Le parcour : "${data.libelle_parcours}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
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