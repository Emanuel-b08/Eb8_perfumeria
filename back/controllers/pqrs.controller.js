import { pool } from "../db.js";

export const agregarPqrs = async (req,res) => { 
    const { nombre, correo, tipo, mensaje } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO pqrs (nombre, correo, tipo, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, correo, tipo, mensaje]
    );
    res.status(201).json({ id: result.insertId, nombre, correo, tipo, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const obtenerPqrs = async (req,res) => { const { nombre, correo, tipo, mensaje } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO pqrs (nombre, correo, tipo, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, correo, tipo, mensaje]
    );
    res.status(201).json({ id: result.insertId, nombre, correo, tipo, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};
