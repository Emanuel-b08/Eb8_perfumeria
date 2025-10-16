


// ========================
// 🔐 Verificación del token
// ========================

function verificarLogin() {
  const token = localStorage.getItem("token");

  if (!token) {
    // No hay sesión → redirigir al login
    window.location.href = "login.html";
    return;
  }

  try {
    // Decodificar el token (sin validar con backend)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    const ahora = Date.now();

    if (ahora > exp) {
      // Token expiró → limpiar y redirigir
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error("Token inválido o corrupto:", err);
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}

// ========================
// 🚪 Cerrar sesión
// ========================
function cerrarSesion() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function verificarLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}
