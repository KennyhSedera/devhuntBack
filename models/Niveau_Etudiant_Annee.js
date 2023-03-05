module.exports = (sequelize, Sequelize)=>{
const Niveau_Etudiant_Annee = sequelize.define( "Niveau_Etudiant_Annee", {}, { timestamps: true });
return Niveau_Etudiant_Annee;
}