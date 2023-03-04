const Table =require('../models/index')
const matiere  = Table.Matiere
const pub = Table.Pub_Matiere
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        matiere.findOne({where:{nom_matiere :req.body.nom_matiere}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`Le matiere : "${data.nom_matiere}" est déjà enregistré dans la base des données`
                        })
                  } else{
                    next()
                  }
        })
        .catch(err=>{
                res.status(500).send({
                   error:  err.message || "Une erreur se produite lors de la recherche de ce matiere " 
                  });
        })
   },
   beforeUpdated(req, res,next){
    matiere.findOne({where:{
          id_matiere:{
               [Opt.not]:req.params.id_matiere
          },
          nom_matiere : req.body.nom_matiere
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`Le matiere : "${data.nom_matiere}" est déjà enregistrée dans la base des données`
               })
           } else{
            next()
         } 
        })
        .catch(err=>{
            res.status(500).send({
               error:
             err.message || "Une erreur se produite lors de la recherche de ce matiere " 
              });

        })
    },
   isInpub (req, res,next){
     pub.findOne({where:{id_matiere: req.params.id_matiere}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`Le matiere : "${data.nom_matiere}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
           }) 
        } else{
            next()
        } 

        })
        .catch(err=>{
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce matiere " 
              });

        })
  },
}