const mysql = require('mysql2');

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    // Salir de la aplicación
    process.exit(1);
    // o volver a intentar la conexión
    // db.connect(retryConnection);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Exportar la conexión para que pueda ser utilizada en otras partes de la aplicación
module.exports = db;
