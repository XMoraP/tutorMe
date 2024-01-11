const express = require('express');
const router = express.Router();
const updateUser = require('../models/profile').updateUser;
const User = require('../models/user');


router.post('/userProfile', async (req, res) => {
  try {
    // Obtén los datos del formulario o del cuerpo de la solicitud
    const { name, grado, email, apellido } = req.body;

    // Llama al método updateUser para actualizar el perfil
    await updateUser({ nombre: name, nombre_grado: grado, email, apellido }, req.session.email);
    const user = await User.findUserByEmail(email); 
    req.session.email = email;
    req.session.userName = user.nombre;
    req.session.userApellido = user.apellido;

    // Envía una respuesta exitosa y redirige
    res.redirect("/profile");
  } catch (error) {
    // Maneja los errores y envía una respuesta de error
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;
