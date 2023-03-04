module.exports = (sequelize, Sequelize)=>{
    const publicite = sequelize.define("Publication", {
        id_pub:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sujet:{
            type:Sequelize.STRING,
        },
        imageUrl:{
            type:Sequelize.STRING,
        },
        approuvate:{
            type:Sequelize.BOOLEAN,
        },
        statut_pub:{
            type:Sequelize.STRING,
        }
    },{
        freezeTableName: true,
        timestamps: true 
    });
    return publicite
}