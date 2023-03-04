const Table =require('../models/index')
const domaine  = Table.Domaine
const pub = Table.Publication
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        domaine.findOne({where:{nom_domaine :req.body.nom_domaine}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`Le domaine : "${data.nom_domaine}" est déjà enregistré dans la base des données`
                        })
                  } else{
                    next()
                  }
        })
        .catch(err=>{
                res.status(500).send({
                   error:  err.message || "Une erreur se produite lors de la recherche de ce domaine " 
                  });
        })
   },
   beforeUpdated(req, res,next){
    domaine.findOne({where:{
          id_domaine:{
               [Opt.not]:req.params.id_domaine
          },
          nom_domaine : req.body.nom_domaine
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`Le domaine : "${data.nom_domaine}" est déjà enregistrée dans la base des données`
               })
           } else{
            next()
         } 
        })
        .catch(err=>{
            res.status(500).send({
               error:
             err.message || "Une erreur se produite lors de la recherche de ce domaine " 
              });

        })
    },
   isInpub (req, res,next){
     pub.findOne({where:{id_domaine: req.params.id_domaine}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`Le domaine : "${data.nom_domaine}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
           }) 
        } else{
            next()
        } 

        })
        .catch(err=>{
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce domaine " 
              });

        })
  },
}