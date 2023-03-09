var Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));


    // Creation Table User
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
    id_user: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    matricule:{ type:Sequelize.STRING, },
    nom:{ type: Sequelize.STRING, allowNull: false },
    prenom:{ type: Sequelize.STRING, allowNull: false },
    email:{ type: Sequelize.STRING, allowNull: false },
    adress:{ type:Sequelize.STRING, },
    contact:{ type: Sequelize.STRING, allowNull: false },
    sexe:{  type: Sequelize.STRING, allowNull: false },
    photo_Profil:{  type:Sequelize.STRING, },
    date_naissance:{  type: Sequelize.DATE, allowNull: false },
    lieu_naissance:{  type: Sequelize.STRING, allowNull: false },
    statut_compte:{ type:Sequelize.STRING, },
    user_permission:{ type:Sequelize.STRING, },
    user_role:{ type:Sequelize.STRING, },
    password: {
        type: Sequelize.STRING,
        set(value) {
            bcrypt.genSaltAsync(10)
            .then(salt => bcrypt.hashSync(value, salt)) 
            .then(hash => this.setDataValue('password', hash));
        }
    },
    password_recup: {
        type: Sequelize.STRING,
        set(value) {
            bcrypt.genSaltAsync(10)
            .then(salt => bcrypt.hashSync(value, salt)) 
            .then(hash => this.setDataValue('password_recup', hash));
        }
    },
},
{
    freezeTableName: true,
    timestamps: true
});

User.prototype.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}
return User
}