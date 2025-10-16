const API = "http://localhost:3000/api/auth";


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const contraseña = document.getElementById("contraseña").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!correo || !contraseña) {
    mensaje.innerHTML = `<p class="text-danger">❌ Todos los campos son obligatorios</p>`;
    return;
  }

  try {
    console.log("📤 Enviando login:", { correo, contraseña });

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await res.json();
    console.log("📥 Respuesta del servidor:", data);

    if (res.ok) {
      mensaje.innerHTML = `<p class="text-success">✅ Inicio de sesión exitoso. Redirigiendo...</p>`;

      // Guardar usuario en localStorage (por si lo usas en el index)
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Esperar un momento y redirigir
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      mensaje.innerHTML = `<p class="text-danger">❌ ${data.error}</p>`;
    }
  } catch (err) {
    console.error("❌ Error en login:", err);
    mensaje.innerHTML = `<p class="text-danger">Error en el servidor</p>`;
  }
});

