const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');
const path = require('path'); // Importa el módulo path

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true }));

// Middleware para agregar encabezados de seguridad a todas las respuestas
server.use((req, res, next) => {
  // X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY'); // o 'SAMEORIGIN' según tu preferencia

  // X-Content-Type-Options
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Content-Security-Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://maxcdn.bootstrapcdn.com; style-src 'self' https://maxcdn.bootstrapcdn.com");

  // Referrer-Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors({ origin: '*', credentials: true }));

// Servir archivos estáticos desde el directorio raíz
server.use(express.static(path.join(__dirname, '..')));

// Si no se encuentra ninguna ruta, servir index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
