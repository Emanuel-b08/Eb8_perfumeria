const express = require("express");
const mysql = require("mysql2/promise"); // usamos la versión con promesas
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());

// Configuración de conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Emanuel0515",
  database: "perfumeria_db"
};

// Endpoint para obtener todos los usuarios
app.get("/pqrs", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM pqrs");
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para agregar un usuario
app.post("/pqrs", async (req, res) => {
  const { nombre, correo, tipo, mensaje } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO pqrs (nombre, correo, tipo, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, correo, tipo, mensaje]
    );
    await connection.end();
    res.status(201).json({ id: result.insertId, nombre, correo, tipo, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});


// Endpoint para obtener todos los usuarios
app.get("/contactanos", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM contactanos");
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para agregar un usuario
app.post("/contactanos", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO contactanos (nombre, correo, mensaje) VALUES (?, ?, ?)",
      [nombre, correo, mensaje]
    );
    await connection.end();
    res.json({ id: result.insertId, nombre, correo, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});




app.post("/trabaja", async (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      "INSERT INTO trabaja (nombre, correo, telefono, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, correo, telefono, mensaje ]
    );
    await connection.end();
    res.json({ id: result.insertId, nombre, correo, telefono, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
