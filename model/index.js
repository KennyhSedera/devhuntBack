const Sequelize = require('sequelize');
const config = require('../DB-Config/db');
const localhost = require('../DB-Config/localhost')
const db = {}


    // Creation de base de donnes
async function initialize () {
    await localhost.query(`CREATE Database IF NOT EXISTS ${ config.DATABASE }`, function(err, res){
        if (err)  throw err;
        else console.log('Base de donnee creer avec succee .');
    });
}


    // Connexion a la DB
    const sequelize = new Sequelize(
        config.DATABASE, 
        config.USER, 
        config.PASSWORD, 
        config.Option
    );

    initialize()
    
    try{
        sequelize.authenticate()
            console.log('Connection a la base de donnees avec succees !');
    }catch(err){
        console.log('error');
    }

    db.sequelize = sequelize
    db.Sequelize = Sequelize
    
    db.Action = require("./ActionModel")(sequelize, Sequelize);
    db.Annee = require("./AnneeUnivModel")(sequelize, Sequelize);
    db.Commentaire = require("./CommentaireModel")(sequelize, Sequelize);
    db.Etudiant = require("./EtudientModel")(sequelize, Sequelize);
    db.Message = require("./MessageModel")(sequelize, Sequelize);
    db.Niveau = require("./NiveauModel")(sequelize, Sequelize);
    db.Parcours = require("./ParcoursModel")(sequelize, Sequelize);
    db.Publication = require("./PublicationModel")(sequelize, Sequelize);
    db.Domaine = require("./DomaineModel")(sequelize, Sequelize);
    db.Matier = require("./MatierModel")(sequelize, Sequelize);
    db.Groupe = require("./GroupeMessage")(sequelize, Sequelize);

    db.Parcours.hasMany(db.Etudiant, { foreignKey: 'id_parcour' });
    db.Etudiant.belongsTo(db.Parcours, { foreignKey: 'id_parcour' });

    db.Etudiant.hasMany(db.Commentaire, { foreignKey: 'id_etudiant' });
    db.Commentaire.belongsTo(db.Etudiant, { foreignKey: 'id_etudiant' });

    db.Etudiant.hasMany(db.Action, { foreignKey: 'id_etudiant' });
    db.Action.belongsTo(db.Etudiant, { foreignKey: 'id_etudiant' });

    db.Etudiant.hasMany(db.Publication, { foreignKey: 'id_etudiant' });
    db.Publication.belongsTo(db.Etudiant, { foreignKey: 'id_etudiant' });

    db.Domaine.hasMany(db.Publication, { foreignKey: 'id_domaine' });
    db.Publication.belongsTo(db.Domaine, { foreignKey: 'id_domaine' });

    db.Etudiant.belongsToMany(db.Groupe, { through: 'Groupe_etudiant' });
    db.Groupe.belongsToMany(db.Etudiant, { through: 'Groupe_etudiant' });

    db.Publication.hasMany(db.Commentaire, { foreignKey: 'id_pub' });
    db.Commentaire.belongsTo(db.Publication, { foreignKey: 'id_pub' });

    db.Etudiant.belongsToMany(db.Annee, { through: 'Niveau_etudiant' });
    db.Annee.belongsToMany(db.Etudiant, { through: 'Niveau_etudiant' });
    db.Niveau.belongsToMany(db.Annee, { through: 'Niveau_etudiant' });
    db.Niveau.belongsToMany(db.Etudiant, { through: 'Niveau_etudiant' });
    db.Etudiant.belongsToMany(db.Niveau, { through: 'Niveau_etudiant' });
    db.Annee.belongsToMany(db.Niveau, { through: 'Niveau_etudiant' });

    db.Publication.belongsToMany(db.Matier, { through: 'Pub_Matier' });
    db.Matier.belongsToMany(db.Publication, { through: 'Pub_Matier' });

    db.Commentaire.belongsToMany(db.Etudiant, { through: 'Reponse' });
    db.Etudiant.belongsToMany(db.Commentaire, { through: 'Reponse' });
 
    db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'id_usersend'}})
    db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'id_usersend'},as:'UserSend'})
 
    db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'id_userreceive'}})
    db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'id_userreceive'},as:'UserReceived'})

    // db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'vu'}})
    // db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'vu'},as:'UserV'})


module.exports = db;