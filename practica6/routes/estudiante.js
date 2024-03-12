const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// Conexión con la base de datos
const { connection } = require("../config.db");

// Mostrar todos los estudiantes
app.get("/", (req, res) => {
  connection.query("SELECT * FROM estudiante", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener estudiantes" });
    } else {
      res.json(results);
    }
  });
});

// Mostrar un estudiante por ID
app.get("/:id", (req, res) => {
  const estudianteId = req.params.id;
  connection.query("SELECT * FROM estudiante WHERE id = ?", [estudianteId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al obtener el estudiante" });
    } else {
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ mensaje: "Estudiante no encontrado" });
      }
    }
  });
});

// Insertar un nuevo estudiante
app.post("/", (req, res) => {
  const { nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email } = req.body;
  connection.query(
    "INSERT INTO estudiante (nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al insertar el estudiante" });
      } else {
        res.status(201).json({ mensaje: "Estudiante insertado correctamente", id: results.insertId });
      }
    }
  );
});

// Actualizar un estudiante por ID
app.put("/:id", (req, res) => {
  const estudianteId = req.params.id;
  const { nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email } = req.body;
  connection.query(
    "UPDATE estudiante SET nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ?, telefono = ?, codigo_postal = ?, email = ? WHERE id = ?",
    [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, estudianteId],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error al actualizar el estudiante" });
      } else {
        if (results.affectedRows > 0) {
          res.json({ mensaje: "Estudiante actualizado correctamente" });
        } else {
          res.status(404).json({ mensaje: "Estudiante no encontrado" });
        }
      }
    }
  );
});

// Eliminar un estudiante por ID
app.delete("/:id", (req, res) => {
  const estudianteId = req.params.id;
  connection.query("DELETE FROM estudiante WHERE id = ?", [estudianteId], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error al eliminar el estudiante" });
    } else {
      if (results.affectedRows > 0) {
        res.json({ mensaje: "Estudiante eliminado correctamente" });
      } else {
        res.status(404).json({ mensaje: "Estudiante no encontrado" });
      }
    }
  });
});

module.exports = app;
