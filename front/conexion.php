<?php
$host = "localhost";
$user = "root";      // tu usuario de MySQL
$pass = "";          // tu contraseña, déjala vacía si no tienes
$db   = "perfumeria_db"; // nombre de la base de datos

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
}
?>

?>
