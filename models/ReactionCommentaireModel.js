module.exports = (sequelize, Sequelize)=>{
    const reaction = sequelize.define("Reaction", {
        reaction_name:{
            type:Sequelize.STRING,
        }
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return reaction
}