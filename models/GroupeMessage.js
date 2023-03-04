module.exports = (sequelize, Sequelize)=>{
    const Groupe = sequelize.define("Groupe Messanger",{
        id_groupe:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nom_groupe:{
            type:Sequelize.STRING,
            allowNull:false
        },
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return Groupe
}