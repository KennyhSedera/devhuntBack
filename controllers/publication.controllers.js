const Table = require('../models/index')
const Publication = Table.Publication
const pubmatiere = Table.Pub_Matiere
const Matiere = Table.Matiere
const Domaine = Table.Domaine
const Etudiant = Table.Etudiant

module.exports = {
   async add (req, res){
   await Publication.create(req.body)
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
        })
    },
    async show (req, res){
        await  Publication.findOne(req.params.id_pub)
        .then(data=> {
          res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
               error: err.message || "Une erreur se produite lors de la recherche de ce Publication " 
                   });
            })
    },
    async index (req,res){
        await Publication.findAll({
          include:[Etudiant, Domaine]
        })
        .then(data=>{
          res.send({Publication :data})
        }) 
        .catch(err=>{
          res.status(500).send({
             error:
                    err.message||"Une erreur se produite "
          })
        }) 
          
    },
    async delete (req,res){
         await  Publication.destroy({
          where:{
            id_pub: req.params.id_pub}
          })
         .then(data=>{
             res.send({success :'Publication supprimée avec succèe'})
          }) 
         .catch(err=>{
            res.status(500).send({
             error: err.message||"Une erreur se produite "
         })
        })               
    },
    async update (req,res){
        await Publication.update(req.body,{
                  where:{id_pub:req.params.id_pub}})
        .then(data=>{
           res.send({ success :'Publication modifié avec succèe' })
        }) 
         .catch(err=>{
             res.status(500).send({error:  err.message || "Une erreur se produite lors de la modification de ce Publication "});
         })   
    },
    async register(req, res){
    const publication = await Publication.create(req.body)
    
    
    // 2. Find the Classes row
    const matiereRow = await Matiere.findOne({id_matiere:req.body.id_matiere});
    
    // 3. INSERT the association in Enrollments table
    await publication.addMatiere(matiereRow, { through: pubmatiere })
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

    }
}