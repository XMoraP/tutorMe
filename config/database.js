// config/database.js

const mysql = require('mysql2');
const fs = require('fs');


const db = mysql.createConnection({
    host: 'tutorme.mysql.database.azure.com',
    user: 'XMoraP',
    password: 'tutorMe123',
    database: 'tutorMe',
    port: 3306,
    ssl: {
        ca: fs.readFileSync('./DigiCertGlobalRootCA.crt.pem'),
    }
});

module.exports = db;
