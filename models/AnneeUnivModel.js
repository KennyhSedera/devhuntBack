module.exports = (sequelize, Sequelize)=>{
    const Annee = sequelize.define("AnneeUniversitaire",{
        id_annee:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        libelle_annee:{
            type:Sequelize.STRING,
            allowNull:false
        }
    },{
        freezeTableName: true,
        timestamps: false 
    })
    return Annee
}