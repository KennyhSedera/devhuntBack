module.exports = (sequelize, Sequelize)=>{
    const Domaine = sequelize.define("Domaine",{
        id_domaine:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nom_domaine:{
            type:Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return Domaine
}