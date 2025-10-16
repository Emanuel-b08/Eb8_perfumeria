// ======================= CONFIGURACIÓN =======================
const API_URL = "http://localhost:3000/api/productos"; // Puerto correcto

const form = document.getElementById("formProducto");
const tabla = document
  .getElementById("tablaProductos")
  .getElementsByTagName("tbody")[0];

const inputId = document.getElementById("id");
const inputNombre = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");
const inputPrecio = document.getElementById("precio");
const inputImagen = document.getElementById("imagen");

const formularioDiv = document.getElementById("formulario");
const btnMostrarFormulario = document.getElementById("btnMostrarFormulario");
const tituloFormulario = document.getElementById("tituloFormulario");

// ======================= CARGAR PRODUCTOS =======================
async function cargarProductos() {
  try {
    const res = await fetch(API_URL);
    const productos = await res.json();

    tabla.innerHTML = ""; // Limpia la tabla

    console.log(productos)

    productos.forEach((p) => {
      const fila = tabla.insertRow();

      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.detalle}</td>
        <td>$${p.valor}</td>
        <td>
          ${
            p.imagen
              ? `<img src="../back/front/uploads/${p.imagen}" alt="Imagen" width="70" height="70" style="object-fit:cover;border-radius:8px;">`
              : "Sin imagen"
          }
        </td>
        <td>
          <button class="btn-editar" onclick="editarProducto(${p.id}, '${p.nombre}', '${p.detalle}', ${p.valor})">✏️</button>
          <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">🗑️</button>
        </td>
      `;
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// ======================= GUARDAR / EDITAR PRODUCTO =======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombre", inputNombre.value);
  formData.append("descripcion", inputDescripcion.value);
  formData.append("precio", inputPrecio.value);

  if (inputImagen.files[0]) {
    formData.append("imagen", inputImagen.files[0]);
  }

  try {
    let res;

    if (inputId.value) {
      res = await fetch(`${API_URL}/${inputId.value}`, {
        method: "PUT",
        body: formData,
      });
    } else {
      res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
    }

    if (res.ok) {
      alert("✅ Producto guardado correctamente");
      form.reset();
      inputId.value = "";
      formularioDiv.style.display = "none";
      cargarProductos();
    } else {
      const error = await res.text();
      alert("❌ Error al guardar producto: " + error);
    }
  } catch (error) {
    console.error("Error al guardar:", error);
  }
});

// ======================= EDITAR PRODUCTO =======================
function editarProducto(id, nombre, detalle, valor, imagen) {
  formularioDiv.style.display = "block";
  tituloFormulario.textContent = "Editar Producto";
  inputId.value = id;
  inputNombre.value = nombre;
  inputDetalle.value = descripcion;
  inputValor.value = valor;
  inputImagen.value = "";
}

// ======================= ELIMINAR PRODUCTO =======================
async function eliminarProducto(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("🗑️ Producto eliminado correctamente");
      cargarProductos();
    } else {
      alert("❌ Error al eliminar el producto");
    }
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
}

// ======================= INICIO =======================
document.addEventListener("DOMContentLoaded", cargarProductos);
