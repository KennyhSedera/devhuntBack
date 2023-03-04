const Table =require('../models/index')
const Etudiant  = Table.Etudiant
const pub = Table.Publication
const Sequelize = require('sequelize')
const Opt = Sequelize.Op
module.exports ={
    isExist (req, res,next){
        Etudiant.findOne({where:{matricule :req.body.matricule}})
        .then(data=>{
               if(data){
                        res.send({
                             error:`La matricule : "${data.matricule}" est déjà enregistré dans la base des données`
                        })
                  } else{
                    next()
                  }
        })
        .catch(err=>{
                res.status(500).send({
                   error:  err.message || "Une erreur se produite lors de la recherche de cet etudiant " 
                  });
        })
   },
   beforeUpdated(req, res,next){
    Etudiant.findOne({where:{
          matricule :{
            [Opt.eq]:req.body.matricule
          },
    }})
    .then(data=>{
          if(data){ 
               res.send({
                    error:`L\'etudiant : "${data.matricule}" est déjà enregistrée dans la base des données`
               })
           } else{
            next()
         } 
        })
        .catch(err=>{
            res.status(500).send({
               error:
             err.message || "Une erreur se produite lors de la recherche de cet etudiant " 
              });

        })
    },
   isInpub (req, res,next){
     pub.findOne({where:{id_etudiant: req.params.id_etudiant}})
     .then(data=>{
          if(data){ 
           res.send({
                error:`L\'etudiant : "${data.nom_etudiant}"  est lié à une document , vous ne pouvez pas le supprimer car celà risque d\'une perte des données`
           }) 
        } else{
            next()
        } 

        })
        .catch(err=>{
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de cet etudiant " 
              });

        })
  },
}