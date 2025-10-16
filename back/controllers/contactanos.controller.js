import { pool } from "../db.js";

export const agregarContactanos = async (req,res) => { 
    const { nombre, correo, mensaje } = req.body;
  try {
    const [result] = await pool.query(
    
      "INSERT INTO contactanos (nombre, correo, mensaje) VALUES (?, ?, ?)",
      [nombre, correo, mensaje]
    );
    res.json({ id: result.insertId, nombre, correo, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

export const obtenerContactanos = async (req,res) => { 
    const { nombre, correo, mensaje } = req.body;
  try {
    
    const [result] = await pool.query(  
        "INSERT INTO contactanos (nombre, correo, mensaje) VALUES (?, ?, ?)",
      [nombre, correo, mensaje]     
    );
    res.json({ id: result.insertId, nombre, correo, mensaje });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};
    