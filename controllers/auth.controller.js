const Table = require('../models/index')
const Etudiant = Table.Etudiant

module.exports = {
    async login (req, res){
    try{
        const {email,password} = req.body
          const etudiant  = await Etudiant.findOne({
            where : {email: email}
          })
                             
          //  .then(Etudiant=>{
              if(!etudiant){
                   res.send({ error:'Cet email ne correspond pas à une compte' })
                  }
                 else{ 
                        console.log(etudiant)
            const isPassWordValid =  await etudiant.comparePassWord(password)   
            // const passwordEtudiant = Etudiant.password
                //   const status = etudiant.statut_compte
                // if(status){
                      if(isPassWordValid){
                          res.send({
                               Etudiant : 'etudiant',
                              })
                       }
                       else {
                           res.send({
                           error:'Le mot de passe que vous avez saisi est incorrecte'
                       })
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