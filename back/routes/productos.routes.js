// back/routes/productos.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productos.controllers.js"; // <-- asegúrate que el archivo controlador se llama exactamente productos.controllers.js

import { fileURLToPath } from "url";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// carpeta uploads (dentro de front)
const uploadDir = path.join(__dirname, "../front/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Carpeta creada:", uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", obtenerProductos);
router.post("/", upload.single("imagen"), agregarProducto);
router.put("/:id", upload.single("imagen"), actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
