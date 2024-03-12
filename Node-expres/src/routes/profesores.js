const express = require("express");
const router = express.Router();

/* GET */
/* Mostrar todos los alumnos */
const getProfesor = (request, response) => {
  connection.query("SELECT * FROM profesores", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};

/* Mostrar los alumnos por id */
const getProfesorId = (request, response) => {
  const id = request.params.id;
  connection.query(
    "SELECT * FROM profesores where id=?",
    [id],
    (error, results) => {
      if (error) throw error;
      response.status(200).json(results);
    }
  );
};

/* Post */
//Insertar alumno
const insertarProfesor = (request, response) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    codigo_postal,
    email,
    especialidad
  } = request.body;
  connection.query(
    "INSERT INTO profesores(nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad) VALUES (?,?,?,?,?,?,?)",
    [
      nombre,
      apellido,
      fecha_nacimiento,
      direccion,
      telefono,
      codigo_postal,
      email,
      especialidad
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
const borrarProfesor = (request, response) => {
  const id = request.params.id;
  connection.query(
    "Delete from profesores where id = ?",
    [id],
    (error, results) => {
      if (error) throw error;
      response.status(201).json({ "Item eliminado": results.affectedRows });
    }
  );
};

/* PUT */
const actualizarProfesor = (request, response) => {
  const id = request.params.id;
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    direccion,
    telefono,
    codigo_postal,
    email,
    especialidad
  } = request.body;
  connection.query(
    "UPDATE estudiantes SET nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ?, telefono = ?, codigo_postal = ?, email = ?, especialidad = ? WHERE id = ?",
    [
      nombre,
      apellido,
      fecha_nacimiento,
      direccion,
      telefono,
      codigo_postal,
      email,
      especialidad,
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

router.get("/profesor", getProfesor);
router.get("/profesor/:id", getProfesorId);
router.post("/profesor", insertarProfesor);
router.delete("/profesor/:id", borrarProfesor);
router.put("/profesor/:id", actualizarProfesor);

module.exports = router;
const { connection } = require("../config"); // Importa la variable connection desde el archivo config.js
