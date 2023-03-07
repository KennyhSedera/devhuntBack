const config = require('./db');
const mysql = require('mysql');
// const mysql = require('mysql2');


const connexion = mysql.createConnection({
    host: config.Option.HOST,
    user: config.USER,
    password: config.PASSWORD,
});

connexion.connect((req, res, err) => {
    if (err) {
        res.send(err)
    } else console.log('Connexion au Localhost reussi.');
})

module.exports = connexion; 