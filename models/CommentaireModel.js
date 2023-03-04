module.exports = (sequelize, Sequelize)=>{
    const Commentaire = sequelize.define("Commentaire",{
        id_commentaire:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        contenue:{
            type: Sequelize.STRING,
            allowNull:false
        }
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return Commentaire
}