const Table = require('../models/index')
const Groupe = Table.Groupe
const Etudiant = Table.Etudiant
const gpetudiant = Table.Groupe_etudiant

module.exports = {
   async add (req, res){
    const publication = await Groupe.create(req.body)
    
    
    // 2. Find the Classes row
    const etudiantRow = await Etudiant.findOne({id_user:req.body.id_id_etudiantCreated});
    
    // 3. INSERT the association in Enrollments table
    await publication.addEtudiant(etudiantRow, { through: gpetudiant })
    .then(data=> {
      res.send({
          success:'Publication ajouté avec succèe '
      })
    }) 
    .catch(err=>{
    res.status(500).send({
          error:
            err.message||"Une erreur se produite lors de l'ajout de ce Publication "
        })
    });
    },
    async show (req, res){
        await  Groupe.findOne({id_groupe:req.params.id_groupe})
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Groupe " 
                   });
            })
    },
    async index (req,res){
        await Groupe.findAll()
        .then(data=>{
          res.send({Groupe :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Groupe.destroy({
          where:{
            id_groupe: req.params.id_groupe}
          })
         .then(data=>{
             res.send({success :'Groupe supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Groupe.update(req.body,{
                  where:{id_groupe:req.params.id_groupe}})
        .then(data=>{
           res.send({ success :'Groupe modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Groupe "});
         })   
    },
}