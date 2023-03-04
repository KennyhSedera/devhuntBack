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
    db.Etudiant = require("./EtudiantModel")(sequelize, Sequelize);
    db.Message = require("./MessageModel")(sequelize, Sequelize);
    db.Niveau = require("./NiveauModel")(sequelize, Sequelize);
    db.Parcours = require("./ParcoursModel")(sequelize, Sequelize);
    db.Publication = require("./PublicationModel")(sequelize, Sequelize);
    db.Domaine = require("./DomaineModel")(sequelize, Sequelize);
    db.Matiere = require("./MatiereModel")(sequelize, Sequelize);
    db.Groupe = require("./GroupeMessage")(sequelize, Sequelize);
    db.Groupe_etudiant = sequelize.define( "Groupe_etudiant", {}, { timestamps: false });
    db.Pub_Matiere = sequelize.define( "Pub_Matiere", {}, { timestamps: false });
    db.Reponse = sequelize.define( "Reponse", {}, { timestamps: false });
    db.Niveau_etudiant = sequelize.define( "Niveau_etudiant", {}, { timestamps: false });

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

    db.Etudiant.belongsToMany(db.Groupe, { through: db.Groupe_etudiant, foreignKey: 'id_groupe' });
    db.Groupe.belongsToMany(db.Etudiant, { through: db.Groupe_etudiant, foreignKey: 'id_etudiant' });

    db.Publication.hasMany(db.Commentaire, { foreignKey: 'id_pub' });
    db.Commentaire.belongsTo(db.Publication, { foreignKey: 'id_pub' });

    db.Etudiant.belongsToMany(db.Annee, { through: db.Niveau_etudiant, foreignKey: 'id_etudiant' });
    db.Annee.belongsToMany(db.Etudiant, { through: db.Niveau_etudiant, foreignKey: 'id_annee' });
    db.Niveau.belongsToMany(db.Etudiant, { through: db.Niveau_etudiant, foreignKey: 'id_niveau' });

    db.Publication.belongsToMany(db.Matiere, { through: db.Pub_Matiere, foreignKey: 'id_matiere'});
    db.Matiere.belongsToMany(db.Publication, { through: db.Pub_Matiere, foreignKey: 'id_pub'});

    db.Commentaire.belongsToMany(db.Etudiant, { through: db.Reponse, foreignKey: 'id_etudiant' });
    db.Etudiant.belongsToMany(db.Commentaire, { through: db.Reponse, foreignKey: 'id_commentaire' });
 
    db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'id_usersend'}})
    db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'id_usersend'},as:'UserSend'})
 
    db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'id_userreceive'}})
    db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'id_userreceive'},as:'UserReceived'})

    // db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'vu'}})
    // db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'vu'},as:'UserV'})


module.exports = db;