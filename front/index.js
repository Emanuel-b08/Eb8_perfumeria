// ✅ Mostrar el nombre del usuario al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const usuarioData = localStorage.getItem("usuario");
  const bienvenida = document.getElementById("bienvenida");

  if (usuarioData) {
    const usuario = JSON.parse(usuarioData);
    bienvenida.textContent = `👋 Bienvenido, ${usuario.nombre}`;
  } else {
    // Si no hay usuario logueado, redirige al login
    window.location.href = "login.html";
  }
});

// ✅ (Opcional) Botón para cerrar sesión
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
};
