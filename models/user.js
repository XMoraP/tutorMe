// models/user.js
const db = require('../config/database');

module.exports = {
  createUser: (user) => {
    return new Promise((resolve, reject) => {
      const { nombre, contrasenna, eMail} = user;
      const insertQuery = 'INSERT INTO user (nombre, contrasenna, eMail) VALUES (?, ?, ?)';
      db.query(insertQuery, [nombre, contrasenna, eMail], (err, result) => {
        if (err) {
          reject(err);
          console.error('Error in createUser query:', err);
        } else {
          resolve(result);
          console.log('User created successfully:', result);
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
