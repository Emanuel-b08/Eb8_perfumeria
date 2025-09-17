<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$database   = "perfumeria_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}
echo "✅ Conexión exitosa a la base de datos '$database'";
?>
