const Table = require('../models/index')
const Message = Table.Message
const Sequelize = require('sequelize')
const Opt = Sequelize.Op

module.exports = {
  async add (req, res){
  await Message.create(req.body)
    .then(data=> {
      res.send({ success: data })
    }) 
    .catch(err=>{
      res.status(500).send({
        error: err.message||"Une erreur se produite lors de l'ajout de ce Message "
      })
    })
  },
  async index (req,res){
    await Message.findAll({
      where:{[Opt.or]:{id_usersend:req.params.id_user, id_userreceive:req.params.id_user},
      // [Op.ne]:{}
    },
      attributes:[
        [Sequelize.fn('DISTINCT',Sequelize.col('id_userreceive')),'id_userreceive'],
        [Sequelize.fn('Max',Sequelize.col('createdAt')),'createdAt'],
        'continue_message'
      ],
      group:['id_userreceive'],
      order:[['createdAt', 'DESC']]
    })
    .then(data=>{
      var msg = data.filter(elt => elt.id_usersend != req.params.id_user && elt.id_userreceive != req.params.id_user)
      res.send({Message :msg})
    }) 
    .catch(err=>{
      console.log(err);
      res.status(500).send({
        error: err.message||"Une erreur se produite "
      })
    })       
  },
  async getMessage (req,res){
    await Message.findAll({
      where:{
        id_usersend:req.params.id_usersend, id_userreceive:req.params.id_userreceive
      }
    })
    .then(data=>{
      res.send({Message :data})
    }) 
    .catch(err=>{
      res.status(500).send({
        error: err.message||"Une erreur se produite "
      })
    }) 
        
  },
  async delete (req,res){
    await  Message.destroy({ where:{id_message: req.params.id_message} })
      .then(data=>{
          res.send({success :'Message supprimée avec succèe'})
      }) 
      .catch(err=>{
        res.status(500).send({
          error: err.message||"Une erreur se produite "
      })
    })               
  },
}