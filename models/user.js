// models/user.js
const db = require('../config/database');

const createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
        id_user int NOT NULL AUTO_INCREMENT,
        nombre varchar(30) DEFAULT NULL,
        apellido varchar(30) NOT NULL,
        eMail varchar(30) NOT NULL,
        contrasenna varchar(50) DEFAULT NULL,
        nombre_grado varchar(100) DEFAULT NULL,
        status varchar(20) DEFAULT NULL,
        PRIMARY KEY (my_row_id)
    )
`;

db.query(createUserTable, (err, result) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or already exists');
  }
});

module.exports = {
  createUser: (user) => {
    return new Promise((resolve, reject) => {
      const { nombre, contrasenna } = user;
      const insertQuery = 'INSERT INTO user (nombre, contrasenna) VALUES (?, ?)';
      db.query(insertQuery, [nombre, contrasenna], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  findUser: (nombre, contrasenna) => {
    return new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM user WHERE nombre = ? AND contrasenna = ?';
      db.query(selectQuery, [nombre, contrasenna], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]); // Assuming the result is an array with one user
        }
      });
    });
  },
};
