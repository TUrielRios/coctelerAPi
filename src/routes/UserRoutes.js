const express = require('express');
const userRoutes = express.Router();
const {User} = require('../db');

//Ruta para obtener usuarios
userRoutes.get('/', async(req,res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
})
// Ruta para crear nuevo usuario
userRoutes.post('/',  async (req, res) => {
    try {
    
        const { username, email, password, plan } = req.body;
        console.log('Datos del JSON:', username, email, password, plan);
  
  
      // Resto de la lógica para crear el user utilizando jsonData y req.file
      const nuevoUser = await User.create({
        username: username,
        email: email,
        password: password,
        plan: plan
        // También puedes incluir campos adicionales según sea necesario
      });
  
      res.status(201).json(nuevoUser);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Error al crear un nuevo usuario' });
    }
  });

  // Obtener un usuario por ID
userRoutes.get('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'user no encontrado' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el user' });
    }
  });

// Actualizar un user por ID
userRoutes.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password, plan } = req.body;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'user no encontrado' });
      }
  
      // Actualizar los datos del user
      user.username = username;
      user.email = email;
      user.password = password;
      user.plan = plan;
  
      // Guardar los cambios en la base de datos
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el user' });
    }
  });
  
    // Eliminar un user por ID
    userRoutes.delete('/:id', async (req, res) => {
      const userId = req.params.id;
    
      try {
        const user = await User.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'user no encontrado' });
        }
    
        await user.destroy();
    
        res.json({ mensaje: 'user eliminado exitosamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el user' });
      }
    });

module.exports = userRoutes;