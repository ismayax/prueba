const dotenv = require("dotenv");
/* Especifico la ruta de mi archivo para traerme mis variables de entorno sino me daba conflicto con la otra */
dotenv.config({ path: 'src/.env' });

const mysql = require("mysql2");
let connection;

/* Meto mi coneccion en un try para manejarla cuando falle */
try {
  connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
  });
} catch (error) {
  console.log("Error al conectar con la base de datos");
}

/* Empaqueto mi conexion */
module.exports = { connection };


