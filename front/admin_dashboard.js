document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const nombre = localStorage.getItem("nombreUsuario");
  const rol = localStorage.getItem("rolUsuario");

  console.log("Verificando sesión admin:", { token, nombre, rol });

  if (!token || rol !== "admin") {
    alert("🚫 No tienes acceso. Inicia sesión como administrador.");
    window.location.href = "adminlogin.html";
    return;
  }

  // Mostrar nombre del admin
  document.getElementById("adminName").textContent = nombre || "Administrador";

  // Botón de cerrar sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "adminlogin.html";
  });
});

