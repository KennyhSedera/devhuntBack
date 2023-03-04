module.exports = (sequelize, Sequelize)=>{
    const matiere = sequelize.define("matiere",{
        id_matiere:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nom_matiere:{
            type:Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return matiere
}