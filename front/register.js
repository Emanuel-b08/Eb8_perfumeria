// ✅ URL base del backend
const API = "http://localhost:3000/api/auth";


// ✅ Evento para el formulario de registro
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!nombre || !correo || !contraseña) {
    mensaje.innerHTML = `<p class="text-danger">❌ Todos los campos son obligatorios</p>`;
    return;
  }

  try {
    console.log("📤 Enviando registro:", { nombre, correo, contraseña });

    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, contraseña }),
    });

    const data = await res.json();
    console.log("📥 Respuesta del servidor:", data);

    if (res.ok) {
      mensaje.innerHTML = `<p class="text-success">✅ Registro exitoso. Redirigiendo...</p>`;
      setTimeout(() => (window.location.href = "login.html"), 1500);
    } else {
      mensaje.innerHTML = `<p class="text-danger">❌ ${data.error}</p>`;
    }
  } catch (err) {
    console.error("❌ Error en registro:", err);
    mensaje.innerHTML = `<p class="text-danger">Error en el servidor</p>`;
  }
});
