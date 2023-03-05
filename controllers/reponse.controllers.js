const Table = require('../models/index')
const Reponse = Table.Reponse


module.exports = {
    async add (req, res){
    await Reponse.create(req.body)
      .then(data=> {
        res.send({ success: data })
      }) 
      .catch(err=>{
        console.log(err);
        res.status(500).send({
          error: err.message||"Une erreur se produite lors de l'ajout de ce Reponse "
        })
      })
    },
    async index (req,res){
      await Reponse.findAll({
        order:[['createdAt', 'DESC']]
      })
      .then(data=>{
        res.send({Reponse : data})
      }) 
      .catch(err=>{
        console.log(err);
        res.status(500).send({
          error: err.message||"Une erreur se produite "
        })
      })       
    },
    async delete (req,res){
      await  Reponse.destroy({ where:{id_reponse: req.params.id_reponse} })
        .then(data=>{
            res.send({success :'Reponse supprimée avec succèe'})
        }) 
        .catch(err=>{
          res.status(500).send({
            error: err.message||"Une erreur se produite "
        })
      })               
    },
    async update (req,res){
      await  Reponse.update(req.body, { where:{id_reponse: req.params.id_reponse} })
        .then(data=>{
            res.send({success :'Reponse modifiée avec succèe'})
        }) 
        .catch(err=>{
          res.status(500).send({
            error: err.message||"Une erreur se produite "
        })
      })               
    },
  }