var express = require('express');
var router = express.Router();
const User = require('../models/user');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Obtén la información del usuario desde la base de datos
    const user = await User.findUserByEmail(req.session.email);

    // Construir el objeto 'profile' para pasarlo a la vista
    const profile = {
      nombre: user.nombre,
      email: user.eMail,
      imageLink: `/uploads/${user.id_user}.png`, // Ajusta según la estructura de tu proyecto y el formato de las imágenes
      // ... otras propiedades que puedas necesitar
    };

    // Renderizar la vista con la información del perfil
    res.render('profile', { title: 'Perfil', session: req.session, profile });
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;
