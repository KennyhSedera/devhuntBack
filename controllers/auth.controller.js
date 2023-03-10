const Table = require('../models/index')
const Etudiant = Table.Etudiant
var Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = {
  async signin (req, res){
    try{
      const {email,password} = req.body.where
      const etudiant  = await Etudiant.findOne({ where : {email: email} })

      //  .then(Etudiant=>{
      if(!etudiant){
        res.send({ error:'Cet email ne correspond pas à une compte' })
      }
      else{ 
        var passwordIsValid = bcrypt.compareSync( password, etudiant.password );

        // const passwordEtudiant = Etudiant.password
        //   const status = etudiant.statut_compte
        // if(status){
        if (passwordIsValid) { 
          res.send({ Etudiant : etudiant, })
        }
        else {
          res.send({ error:'Le mot de passe que vous avez saisi est incorrecte' })
        }
    //    }
    //    else {
    //        res.send({
    //        error:"Votre compte a été bloqué par l'administrateur !\n Veuillez le contacter ou envoyer un email."
    //    })
    //  }
      }
    }catch(err){
      res.send({error:err.message })
    }
  },
}