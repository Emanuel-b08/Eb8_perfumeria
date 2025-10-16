// back/controllers/productos.controllers.js
import { pool } from "../db.js";
import fs from "fs";
import path from "path";

export const obtenerProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const agregarProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;

    await pool.query(
      "INSERT INTO productos (nombre, detalle, valor, imagen) VALUES (?, ?, ?, ?)",
      // ADAPTA estos nombres de columnas a tu tabla: en tu descripción la tabla tiene columnas (nombre, detalle, valor, imagen)
      [nombre, descripcion, precio, imagen]
    );

    res.json({ message: "Producto agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ message: "Error al agregar producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    const nuevaImagen = req.file ? req.file.filename : null;

    const [productoExistente] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);

    if (productoExistente.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const imagenAntigua = productoExistente[0].imagen;

    await pool.query(
      "UPDATE productos SET nombre=?, detalle=?, valor=?, imagen=? WHERE id=?",
      [nombre, descripcion, precio, nuevaImagen || imagenAntigua, id]
    );

    if (nuevaImagen && imagenAntigua) {
      const rutaAntigua = path.join(process.cwd(), "front/uploads", imagenAntigua);
      if (fs.existsSync(rutaAntigua)) fs.unlinkSync(rutaAntigua);
    }

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [producto] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);

    if (producto.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const imagen = producto[0].imagen;
    if (imagen) {
      const rutaImagen = path.join(process.cwd(), "front/uploads", imagen);
      if (fs.existsSync(rutaImagen)) fs.unlinkSync(rutaImagen);
    }

    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
