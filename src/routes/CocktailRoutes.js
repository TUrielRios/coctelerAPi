const express = require('express');
const cocktailRoutes = express.Router();
const { Cocktail } = require('../db');

// Ruta para obtener todos los cocktails
cocktailRoutes.get('/', async (req, res) => {
    try {
        const cocktails = await Cocktail.findAll();
        res.status(200).json(cocktails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los cocktails' });
    }
});

// Ruta para crear un nuevo cocktail
cocktailRoutes.post('/', async (req, res) => {
    try {
        const {
            name,
            category,
            season,
            photo,
            taste,
            glassware,
            method,
            ingredients,
            instructions,
            userId
        } = req.body;
  
        const nuevoCocktail = await Cocktail.create({
            name,
            category,
            season,
            photo,
            taste,
            glassware,
            method,
            ingredients,
            instructions,
            userId
        });
  
        res.status(201).json(nuevoCocktail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear un nuevo cocktail' });
    }
});

// Ruta para obtener un cocktail por ID
cocktailRoutes.get('/:id', async (req, res) => {
    const cocktailId = req.params.id;
  
    try {
        const cocktail = await Cocktail.findByPk(cocktailId);
  
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail no encontrado' });
        }
  
        res.json(cocktail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cocktail' });
    }
});

// Ruta para actualizar un cocktail por ID
cocktailRoutes.put('/:id', async (req, res) => {
    const cocktailId = req.params.id;
    const {
        name,
        category,
        season,
        photo,
        taste,
        glassware,
        method,
        ingredients,
        instructions,
        userId
    } = req.body;
  
    try {
        const cocktail = await Cocktail.findByPk(cocktailId);
  
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail no encontrado' });
        }
  
        // Actualizar los datos del cocktail
        cocktail.name = name;
        cocktail.category = category;
        cocktail.season = season;
        cocktail.photo = photo;
        cocktail.taste = taste;
        cocktail.glassware = glassware;
        cocktail.method = method;
        cocktail.ingredients = ingredients;
        cocktail.instructions = instructions;
        cocktail.userId = userId;
  
        // Guardar los cambios en la base de datos
        await cocktail.save();
  
        res.json(cocktail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cocktail' });
    }
});

// Ruta para eliminar un cocktail por ID
cocktailRoutes.delete('/:id', async (req, res) => {
    const cocktailId = req.params.id;
  
    try {
        const cocktail = await Cocktail.findByPk(cocktailId);
  
        if (!cocktail) {
            return res.status(404).json({ error: 'Cocktail no encontrado' });
        }
  
        await cocktail.destroy();
  
        res.json({ mensaje: 'Cocktail eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cocktail' });
    }
});

module.exports = cocktailRoutes;
