module.exports = (sequelize, Sequelize)=>{
   const Reponse = sequelize.define( "Reponse", {
        contenue_reponse:{type:Sequelize.STRING}
    }, { timestamps: true })
    return Reponse
}