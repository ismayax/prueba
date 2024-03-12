var express = require("express");
const app = express();
const mysql = require("mysql2");

/* nos ayuda a analizar el cuerpo de la solicitud POST */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/", function (req, res) {
  res.send("Hola Mundo!");
});

/* Importo el archivo donde defino mis funciones y sus rutas*/
app.use(require('./routes/estudiantes'));
app.use(require('./routes/profesores'));

/* Abro el puerto 3000 para poder hacer las peticiones */
app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});

/* Me traigo lac constante connetion que alberga mi conexion a mysql2 */
const { connection } = require("./config");
