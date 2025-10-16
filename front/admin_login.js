// ===================== CONFIGURACIÓN API =====================
const API = "http://localhost:3000/api/auth";
 // 
// ===================== EVENTO SUBMIT DEL FORMULARIO =====================
document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();
  const mensaje = document.getElementById("mensaje");

  // ===================== VALIDAR CAMPOS =====================
  if (!correo || !contraseña) {
    mensaje.innerHTML = `<p class="text-danger">❌ Todos los campos son obligatorios</p>`;
    return;
  }

  try {
    // ===================== PETICIÓN AL BACKEND =====================
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await res.json();
    console.log("📥 Respuesta del backend:", data);

    if (!res.ok) {
      mensaje.innerHTML = `<p class="text-danger">❌ ${data.error || "Error al iniciar sesión"}</p>`;
      return;
    }

    // ===================== VALIDAR DATOS DEL USUARIO =====================
    const rol = data.usuario?.rol;
    const nombre = data.usuario?.nombre;
    const token = data.token;

    if (!rol || !nombre) {
      mensaje.innerHTML = `<p class="text-danger">⚠️ Respuesta inválida del servidor</p>`;
      return;
    }

    if (rol !== "admin") {
      mensaje.innerHTML = `<p class="text-danger">🚫 No tienes permisos de administrador</p>`;
      return;
    }

    // ===================== GUARDAR DATOS EN LOCALSTORAGE =====================
    localStorage.setItem("token", token);
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("rolUsuario", rol);

    mensaje.innerHTML = `<p class="text-success">✅ Bienvenido administrador ${nombre}</p>`;

    // ===================== REDIRECCIONAR =====================
    setTimeout(() => (window.location.href = "admin_dashboard.html"), 1500);

  } catch (err) {
    console.error("❌ Error en el servidor:", err);
    mensaje.innerHTML = `<p class="text-danger">Error en el servidor</p>`;
  }
});
