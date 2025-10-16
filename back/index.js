// back/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productosRoutes from "./routes/productos.routes.js";
import authRoutes from "./routes/auth.js";
import trabajaRoutes from "./routes/trabaja.routes.js";
import pqrsRoutes from "./routes/pqrs.routes.js";
import contactanosRoutes from "./routes/contactanos.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir carpeta front (estática)
const frontPath = path.join(__dirname, "../front");
app.use(express.static(frontPath, { index: false }));

// Servir imágenes subidas
app.use("/uploads", express.static(path.join(frontPath, "uploads")));

// Rutas API
app.use("/api/productos", productosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trabaja", trabajaRoutes);
app.use("/api/pqrs", pqrsRoutes);
app.use("/api/contactanos", contactanosRoutes);

console.log("✅ Rutas de productos y autenticación cargadas correctamente");

// Ruta por defecto (login admin por ejemplo)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontPath, "admin_login.html"));
});

const PORT = process.env.PORT || 3000; // <-- puerto 3000
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});
