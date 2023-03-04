module.exports = (sequelize, Sequelize)=>{
    const Message = sequelize.define("Message",{
        id_message:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
    },{
        freezeTableName: true,
        timestamps: true 
    })
    return Message
}