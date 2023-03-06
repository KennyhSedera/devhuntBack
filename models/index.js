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

    // initialize()
    
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
    db.Reponse = require("./ReponseModel")(sequelize, Sequelize);
    db.Niveau_etudiant = require("./Niveau_Etudiant_Annee")(sequelize, Sequelize);
    db.ReactionCommentaire = require("./ReactionCommentaireModel")(sequelize, Sequelize);
    db.Groupe_etudiant = sequelize.define( "Groupe_etudiant", {}, { timestamps: false });
    db.Pub_Matiere = sequelize.define( "Pub_Matiere", {}, { timestamps: false });

    db.Parcours.hasMany(db.Etudiant, { foreignKey: 'id_parcour' });
    db.Etudiant.belongsTo(db.Parcours, { foreignKey: 'id_parcour' });

    db.Etudiant.hasMany(db.Groupe, { foreignKey: 'id_etudiantCreated' });
    db.Groupe.belongsTo(db.Etudiant, { foreignKey: 'id_etudiantCreated' });

    db.Etudiant.hasMany(db.Commentaire, { foreignKey: 'id_etudiant' });
    db.Commentaire.belongsTo(db.Etudiant, { foreignKey: 'id_etudiant' });

    db.Etudiant.hasMany(db.Action, { foreignKey: 'id_etudiant' });
    db.Action.belongsTo(db.Etudiant, { foreignKey: 'id_etudiant' });

    db.Etudiant.hasMany(db.Publication, { foreignKey: 'id_etudiant' });
    db.Publication.belongsTo(db.Etudiant, { foreignKey: 'id_etudiant' });

    db.Domaine.hasMany(db.Publication, { foreignKey: 'id_domaine' });
    db.Publication.belongsTo(db.Domaine, { foreignKey: 'id_domaine' });

    db.Commentaire.hasMany(db.ReactionCommentaire, { foreignKey: 'id_commentaire' });
    db.ReactionCommentaire.belongsTo(db.Commentaire, { foreignKey: 'id_commentaire' });

    db.Etudiant.hasMany(db.ReactionCommentaire, { foreignKey: 'id_user' });
    db.ReactionCommentaire.belongsTo(db.Etudiant, { foreignKey: 'id_user' });

    db.Etudiant.belongsToMany(db.Groupe, { through: db.Groupe_etudiant, foreignKey:'id_user' });
    db.Groupe.belongsToMany(db.Etudiant, { through: db.Groupe_etudiant, foreignKey: 'id_groupe' });

    db.Publication.hasMany(db.Commentaire, { foreignKey: 'id_pub' });
    db.Commentaire.belongsTo(db.Publication, { foreignKey: 'id_pub' });

    db.Etudiant.hasMany(db.Niveau_etudiant, {foreignKey: 'id_etudiant'});
    db.Niveau_etudiant.belongsTo(db.Etudiant, {foreignKey: 'id_etudiant'});
    db.Annee.hasMany(db.Niveau_etudiant, {foreignKey: 'id_annee'});
    db.Niveau_etudiant.belongsTo(db.Annee, {foreignKey: 'id_annee'});
    db.Niveau.hasMany(db.Niveau_etudiant, {foreignKey: 'id_niveau'} );
    db.Niveau_etudiant.belongsTo(db.Niveau, {foreignKey: 'id_niveau'} );

    db.Publication.belongsToMany(db.Matiere, { through: db.Pub_Matiere, foreignKey: 'id_matiere'});
    db.Matiere.belongsToMany(db.Publication, { through: db.Pub_Matiere, foreignKey: 'id_pub'});
    db.Publication.hasMany(db.Pub_Matiere, {foreignKey:'id_pub'});
    db.Pub_Matiere.belongsTo(db.Publication, {foreignKey:'id_pub'});
    db.Matiere.hasMany(db.Pub_Matiere, {foreignKey:'id_matiere'});
    db.Pub_Matiere.belongsTo(db.Matiere, {foreignKey:'id_matiere'});

    db.Commentaire.hasMany(db.Reponse,{foreignKey: {name : 'id_commentairerep'}})
    db.Reponse.belongsTo(db.Commentaire,{foreignKey: {name : 'id_commentairerep'}})

    db.Etudiant.hasMany(db.Reponse,{foreignKey: {name : 'id_etudientrep'}})
    db.Reponse.belongsTo(db.Etudiant,{foreignKey: {name : 'id_etudientrep'}})

    db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'id_usersend'}})
    db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'id_usersend'},as:'UserSend'})
 
    db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'id_userreceive'}})
    db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'id_userreceive'},as:'UserReceived'})

    // db.Etudiant.hasMany(db.Message,{foreignKey: {name : 'vu'}})
    // db.Message.belongsTo(db.Etudiant,{foreignKey: {name : 'vu'},as:'UserV'})


module.exports = db;