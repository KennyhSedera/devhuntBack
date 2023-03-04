module.exports = (sequelize, Sequelize)=>{
    const Matier = sequelize.define("Matier",{
        id_matier:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nom_matier:{
            type:Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return Matier
}