var Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = (sequelize, Sequelize)=>{
    const etudient = sequelize.define("Etudiant", {
        id_user: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        matricule:{ type:Sequelize.INTEGER, },
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
        password:{ type:Sequelize.STRING,
            set(value) {
                bcrypt.genSaltAsync(10)
                .then(salt => bcrypt.hashSync(value, salt)) 
                .then(hash => this.setDataValue('Password', hash));
            } 
        },
        password_Recup:{ type:Sequelize.STRING,
            set(value) {
                bcrypt.genSaltAsync(10)
                .then(salt => bcrypt.hashSync(value, salt)) 
                .then(hash => this.setDataValue('Password', hash));
            } 
        },
    },{
        freezeTableName: true,
        timestamps: true 
    });
    etudient.prototype.comparePassword = function(Password){
        return bcrypt.compareAsync(Password, this.Password)
    }
    return etudient
}