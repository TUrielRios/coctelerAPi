const { Router } = require('express');
//const empleadosRoutes = require('./empleadosRoutes');

const userRoutes = require('./UserRoutes');
const cocktailRoutes = require('./CocktailRoutes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
app.use('/usuarios',userRoutes);
app.use('/cocktails', cocktailRoutes)

module.exports = app;