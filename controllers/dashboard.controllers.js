const Table = require('../models/index')
const Etudiant = Table.Etudiant
const Domaine = Table.Domaine
const Publication = Table.Publication

module.exports ={
    async getpublication(req, res){
        await Publication.getAll({
            where:{id_etudiant: req.params.id_user}
        })
        .then((data) => {
            res.send({Publication:data})
        }).catch((err) => {
            res.send({
                error: err.message || "Une erreur se produite lors de l'affichage des publication"
            })
        });
    },
    
}