const express = require("express");
const app = express();
const { connection } = require('./config.db.js');

// Nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargamos los archivos de rutas
const estudianteR = require('./routes/estudiante');
const profesorR = require('./routes/profesor');

// Utilizamos las rutas
app.use('/estudiante', estudianteR);
app.use('/profesor', profesorR);  

app.listen(process.env.PORT || 3306, () => {
  console.log("Servidor corriendo en el puerto 3306");
});

module.exports = app;
