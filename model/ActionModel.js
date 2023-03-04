module.exports = (sequelize, Sequelize)=>{
    const action = sequelize.define("Action", {
        id_action:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle_action:{
            type:Sequelize.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return action
}