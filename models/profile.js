const db = require('../config/database');

module.exports = {
    updateUser: (user, session) => {
        return new Promise((resolve, reject) => {
          const { nombre, nombre_grado, email, apellido } = user;
      
          // Utilizar la nueva consulta de actualización
          const updateQuery = 'UPDATE user SET nombre = ?, nombre_grado = ?, eMail = ?, apellido = ? WHERE eMail = ?';
          const emailSesion = session;  // Accede a la propiedad email de la sesión

          // Ejecutar la consulta de actualización con los valores proporcionados
          db.query(updateQuery, [nombre, nombre_grado, email, apellido || '', emailSesion], (err, result) => {
            if (err) {
              reject(err);
              console.error('Error en la consulta updateUser:', err);
            } else {
              resolve(result);
              console.log('Usuario actualizado exitosamente:', result);
            }
          });
        });
      }
}