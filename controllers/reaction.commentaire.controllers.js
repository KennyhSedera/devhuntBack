const Table = require('../models/index')
const Commentaire = Table.Commentaire
const Reaction = Table.ReactionCommentaire
const Etudiant = Table.Etudiant

module.exports = {
   async add (req, res){
   await Reaction.create(req.body)
        .then(data=> {
                res.send({
                    success:'Reaction ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Reaction "
              })
        })
    },
    async show (req, res){
        await  Reaction.findOne(req.params.id)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Reaction " 
                   });
            })
    },
    async index (req,res){
        await Reaction.findAll({
            where:{id_commentaire:req.params.id},
            include:[Etudiant, 
                // {exclude:["email","adress","contact", "sexe","date_naissance","lieu_naissance","statut_compte","user_permission","password","password_Recup","createdAt","updatedAt","id_parcour"]}
            ]
        })
        .then(data=>{
          res.send({Reaction :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Reaction.destroy({
          where:{
            id: req.params.id}
          })
         .then(data=>{
             res.send({success :'Reaction supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Reaction.update(req.body,{
                  where:{id:req.params.id}})
        .then(data=>{
           res.send({ success :'Reaction modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Reaction "});
         })   
    },
}