var Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = (sequelize, Sequelize)=>{
    const Etudiant = sequelize.define("Etudiant", {
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
        password:{ type:Sequelize.STRING,
            set(value) {
                bcrypt.genSaltAsync(10)
                .then(salt => bcrypt.hashSync(value, salt)) 
                .then(hash => this.setDataValue('password', hash));
            } 
        },
        password_Recup:{ type:Sequelize.STRING,
            set(value) {
                bcrypt.genSaltSync(10)
                .then(salt => bcrypt.hashSync(value, salt)) 
                .then(hash => this.setDataValue('password_Recup', hash));
            } 
        },
    },{
        freezeTableName: true,
        timestamps: true 
    });
    Etudiant.prototype.comparePassWord = (password)=>{
        return bcrypt.compareSync(password, this.password)
    }
    return Etudiant
}