const express = require("express");
const router = express.Router();

/* GET */
/* Mostrar todos los alumnos */
const getEstudiantes = (request, response) => {
  connection.query("SELECT * FROM estudiantes", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

/* Mostrar los alumnos por id */
const getEstudiantesId = (request, response) => {
  const id = request.params.id;
  connection.query(
    "SELECT * FROM estudiantes where id=?",
    [id],
    (error, results) => {
      if (error) throw error;
      response.status(200).json(results);
    }
  );
};

/* Post */
//Insertar alumno
const insertarEstudiante = (request, response) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    codigo_postal,
    email,
  } = request.body;
  connection.query(
    "INSERT INTO estudiantes(nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email) VALUES (?,?,?,?,?,?,?)",
    [
      nombre,
      apellido,
      fecha_nacimiento,
      direccion,
      telefono,
      codigo_postal,
      email,
    ],
    (error, results) => {
      if (error) throw error;
      response
        .status(201)
        .json({ "Item añadido correctamente": results.affectedRows });
    }
  );
};

/* Delete */
//Borrar alumno
const borrarEstudiante = (request, response) => {
  const id = request.params.id;
  connection.query(
    "Delete from estudiantes where id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      response.status(201).json({ "Item eliminado": results.affectedRows });
    }
  );
};

/* PUT */
const actualizarEstudiante = (request, response) => {
  const id = request.params.id;
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    codigo_postal,
    email,
  } = request.body;
  connection.query(
    "UPDATE estudiantes SET nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ?, telefono = ?, codigo_postal = ?, email = ? WHERE id = ?",
    [
      nombre,
      apellido,
      fecha_nacimiento,
      direccion,
      telefono,
      codigo_postal,
      email,
      id,
    ],
    (error, results) => {
      if (error) throw error;
      response
        .status(201)
        .json({ "Item añadido correctamente": results.affectedRows });
    }
  );
};

/* rutas */

router.get("/estudiante", getEstudiantes);
router.get("/estudiante/:id", getEstudiantesId);
router.post("/estudiante", insertarEstudiante);
router.delete("/estudiante/:id", borrarEstudiante);
router.put("/estudiante/:id", actualizarEstudiante);

/* Empaqueto mis rutas */
module.exports = router;

/* Me importo la conexion a base de datos */
const { connection } = require("../config"); // Importa la variable connection desde el archivo config.js
