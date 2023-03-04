const Table = require('../models/models')
const Message = Table.Message

module.exports = {
   async add (req, res){
   await Message.create(req.body)
        .then(data=> {
                res.send({
                    success:'Message ajouté avec succèe '
                })
            }) 
        .catch(err=>{
          res.status(500).send({
                  error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Message "
              })
        })
    },
    async show (req, res){
        await  Message.findOne(req.body.where)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Message " 
                   });
            })
    },
    async index (req,res){
        await Message.findAll()
        .then(data=>{
          res.send({Message :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Message.destroy({
          where:{
            id__Message: req.params.idMessage}
          })
         .then(data=>{
             res.send({success :'Message supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Message.update(req.body.data,{
                  where:req.body.where})
        .then(data=>{
           res.send({ success :'Message modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Message "});
         })   
    }
}