module.exports = (sequelize, Sequelize)=>{
    const Niveau = sequelize.define("Niveau",{
        id_niveau:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        libelle_niveau:{
            type:Sequelize.STRING,
            allowNull:false
        },
        sortant:{ 
            type:Sequelize.BOOLEAN, 
        },
    },{
        freezeTableName: true,
        timestamps: false 
    })
    return Niveau
}