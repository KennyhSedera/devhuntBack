module.exports = (sequelize, Sequelize)=>{
    const Annee = sequelize.define("AnneeUniversitaire",{
        id_annee:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        annee1:{
            type:Sequelize.STRING,
            allowNull:false
        },
        annee2:{
            type:Sequelize.STRING,
            allowNull:false
        },
    },{
        freezeTableName: true,
        timestamps: false 
    })
    return Annee
}