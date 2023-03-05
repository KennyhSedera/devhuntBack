const { Sequelize, Parcours, Domaine } = require('../models/index')
const Table = require('../models/index')
const Etudiant = Table.Etudiant
const Publication = Table.Publication

module.exports ={
    async getpublication(req, res){
        await Publication.findAll({
            where: req.body,
            include:[{model:Etudiant, attributes:['nom', 'prenom', 'matricule', 'photo_Profil']}, {model:Domaine, attributes:['nom_domaine']}]
        })
        .then((data) => {
            res.send({Publication:data})
        }).catch((err) => {
            res.send({
                error: err.message || "Une erreur se produite lors de l'affichage des publication"
            })
        });
    },
    async countEtudientParcour (req, res){
        await Etudiant.findAll({
            where: req.body,
            attributes:[[Sequelize.fn('count', Sequelize.col('id_user')), 'totalEtudientParcour']],
            include:[Parcours]
        })
        .then((data) => {
            res.send({total:data})
        }).catch((err) => {
            res.send({
                error: err.message || "Une erreur se produite lors de la comptage d'etudiant"
            })
        });
    }
}