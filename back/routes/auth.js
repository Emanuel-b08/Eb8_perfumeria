// back/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

const router = express.Router();

// ======================= 🔐 LOGIN DE USUARIO / ADMIN =======================
router.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Correo incorrecto" });
    }

    const usuario = rows[0];
    let match = false;

    if (usuario.contraseña && usuario.contraseña.startsWith("$2b$")) {
      match = await bcrypt.compare(contraseña, usuario.contraseña);
    } else {
      match = contraseña === usuario.contraseña;
    }

    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      "clave_secreta_jwt",
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ======================= REGISTRO =======================
router.post("/register", async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await pool.query(
      "INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, 'usuario')",
      [nombre, correo, hashedPassword]
    );
    res.json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ error: "No se pudo registrar el usuario" });
  }
});

// ======================= VERIFY TOKEN =======================
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Token no proporcionado" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "clave_secreta_jwt");
    return res.json({ valido: true, usuario: { id: decoded.id, nombre: decoded.nombre, rol: decoded.rol } });
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
});

export default router;
