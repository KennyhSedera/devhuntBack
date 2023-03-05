const Table = require('../models/index')
const GE = Table.Groupe_etudiant
const Groupe = Table.Groupe
const Etudiant = Table.Etudiant

module.exports = {
    async add (req, res){
        await  GE.create(req.body)
        .then(data=> {
                res.send({
                    success:'Etudient ajouté avec succèe '
                })
            }) 
        .catch(err=>{
        res.status(500).send({
                error:
                    err.message||"Une erreur se produite lors de l'ajout de ce Etudient "
            })
        })
    },
    async index (req, res){
        await GE.findAll()
        .then((data)=>{
            res.send({groupe:data})
        })
    }
}