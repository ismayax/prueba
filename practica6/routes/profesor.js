const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

// Mostrar todos los profesores
app.get("/", (req, res) => {
  connection.query("SELECT * FROM profesor", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener profesores" });
    } else {
      res.json(results);
    }
  });
});

// Mostrar un profesor por ID
app.get("/:id", (req, res) => {
  const profesorId = req.params.id;
  connection.query("SELECT * FROM profesor WHERE id = ?", [profesorId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener el profesor" });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ mensaje: "Profesor no encontrado" });
      }
    }
  });
});

// Insertar un nuevo profesor
app.post("/", (req, res) => {
  const { nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad, profesorId } = req.body;
  connection.query(
    "INSERT INTO profesor (nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad, profesorId) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)",
    [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad, profesorId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al insertar el profesor" });
      } else {
        res.status(201).json({ mensaje: "Profesor insertado correctamente", id: results.insertId });
      }
    }
  );
});

// Actualizar un profesor por ID
app.put("/:id", (req, res) => {
  const profesorId = req.params.id;
  const { nombre, apellido, especialidad } = req.body;
  connection.query(
    "UPDATE profesor SET nombre = ?, apellido = ?,fecha_nacimiento =?,direccion = ?,telefono = ?,codigo_postal = ?, email= ?, especialidad = ? WHERE id = ?",
    [nombre, apellido,fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad, profesorId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al actualizar el profesor" });
      } else {
        if (results.affectedRows > 0) {
          res.json({ mensaje: "Profesor actualizado correctamente" });
        } else {
          res.status(404).json({ mensaje: "Profesor no encontrado" });
        }
      }
    }
  );
});

// Eliminar un profesor por ID
app.delete("/:id", (req, res) => {
  const profesorId = req.params.id;
  connection.query("DELETE FROM profesor WHERE id = ?", [profesorId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al eliminar el profesor" });
    } else {
      if (results.affectedRows > 0) {
        res.json({ mensaje: "Profesor eliminado correctamente" });
      } else {
        res.status(404).json({ mensaje: "Profesor no encontrado" });
      }
    }
  });
});

module.exports = app;