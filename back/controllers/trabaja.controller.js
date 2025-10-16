import { pool } from "../db.js";

export const agregarTrabaja = async (req,res) => {
  const { nombre, correo, telefono, mensaje } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO trabaja (nombre, correo, telefono, mensaje) VALUES (?, ?, ?, ?)",
      [nombre, correo, telefono, mensaje]
    );

    res.json({ id: result.insertId, nombre, correo, telefono, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

