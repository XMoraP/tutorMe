const express = require('express');
const router = express.Router();
const updateUser = require('../models/profile').updateUser;
const updateUserImage = require('../models/profile').updateUserImage;
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },

  filename: async (req, file, cb) => {
    try {
      const { email } = req.body;
      const user = await User.findUserByEmail(email);
      const userId = user.id_user;
      cb(null, userId + '.png'); // Nombre del archivo (id del usuario + extensión ".png")
    } catch (error) {
      cb(error, null);
    }
  },
});

const upload = multer({ storage });

router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const { email } = req.body;
    const imagePath = req.file.path;
    const user = await User.findUserByEmail(email);

    // Actualiza la ruta de la foto de perfil en la base de datos
    await updateUserImage(user.id_user, imagePath);

    res.status(200).json({ success: true, message: 'Profile picture uploaded successfully.' });
  } catch (error) {
    console.error('Error during profile picture upload:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

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

router.get('/profile', async (req, res) => {
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
    res.render('profile', { profile });
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;
