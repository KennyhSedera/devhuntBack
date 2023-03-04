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
    db.Etudient = require("./EtudientModel")(sequelize, Sequelize);
    db.Message = require("./MessageModel")(sequelize, Sequelize);
    db.Niveau = require("./NiveauModel")(sequelize, Sequelize);
    db.Parcours = require("./ParcoursModel")(sequelize, Sequelize);
    db.Publication = require("./PublicationModel")(sequelize, Sequelize);
    db.Domaine = require("./DomaineModel")(sequelize, Sequelize);
    db.Matier = require("./MatierModel")(sequelize, Sequelize);
    db.Groupe = require("./GroupeMessage")(sequelize, Sequelize);

    db.Etudient.hasMany(db.Parcours, { foreignKey: 'id_parcour' });
    db.Parcours.belongsTo(db.Etudient, { foreignKey: 'id_parcour' });

    db.Commentaire.hasMany(db.Etudient, { foreignKey: 'id_etudient' });
    db.Etudient.belongsTo(db.Commentaire, { foreignKey: 'id_etudient' });

    db.Etudient.hasMany(db.Niveau, { foreignKey: 'id_niveau' });
    db.Niveau.belongsTo(db.Etudient, { foreignKey: 'id_niveau' });

    db.Etudient.hasMany(db.Action, { foreignKey: 'id_action' });
    db.Action.belongsTo(db.Etudient, { foreignKey: 'id_action' });

    db.Publication.hasMany(db.Etudient, { foreignKey: 'id_etudient' });
    db.Etudient.belongsTo(db.Publication, { foreignKey: 'id_etudient' });

    db.Message.hasMany(db.Etudient, { foreignKey: 'id_etudient' });
    db.Etudient.belongsTo(db.Message, { foreignKey: 'id_etudient' });

    db.Publication.hasMany(db.Domaine, { foreignKey: 'id_domaine' });
    db.Domaine.belongsTo(db.Publication, { foreignKey: 'id_domaine' });

    db.Groupe.hasMany(db.Etudient, { foreignKey: 'id_etudient' });
    db.Etudient.belongsTo(db.Groupe, { foreignKey: 'id_etudient' });

    db.Commentaire.hasMany(db.Publication, { foreignKey: 'id_pub' });
    db.Publication.belongsTo(db.Commentaire, { foreignKey: 'id_pub' });

    db.Etudient.belongsToMany(db.Annee, { through: 'Niveau_etudiant' });
    db.Annee.belongsToMany(db.Etudient, { through: 'Niveau_etudiant' });

    db.Publication.belongsToMany(db.Matier, { through: 'Pub_Matier' });
    db.Matier.belongsToMany(db.Publication, { through: 'Pub_Matier' });

    db.Commentaire.belongsToMany(db.Etudient, { through: 'Reponse' });
    db.Etudient.belongsToMany(db.Commentaire, { through: 'Reponse' });
 
    db.Etudient.hasMany(db.Message,{foreignKey: {name : 'id_usersend'}})
    db.Message.belongsTo(db.Etudient,{foreignKey: {name : 'id_usersend'},as:'UserSend'})
 
    db.Etudient.hasMany(db.Message,{foreignKey: {name : 'id_userreceive'}})
    db.Message.belongsTo(db.Etudient,{foreignKey: {name : 'id_userreceive'},as:'UserReceived'})

    db.Etudient.hasMany(db.Message,{foreignKey: {name : 'vu'}})
    db.Message.belongsTo(db.Etudient,{foreignKey: {name : 'vu'},as:'UserV'})


module.exports = db;