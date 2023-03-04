module.exports = (sequelize, Sequelize)=>{
    const Parcours = sequelize.define("Parcours",{
        id_parcours:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        libelle_parcours:{
            type:Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: false 
    })
    return Parcours
}