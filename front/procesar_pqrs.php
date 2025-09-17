<?php
require "conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $tipo   = $_POST['tipo'];
    $mensaje= $_POST['mensaje'];

    $sql = "INSERT INTO pqrs (nombre, correo, tipo, mensaje, fecha) 
            VALUES ('$nombre', '$correo', '$tipo', '$mensaje', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "✅ PQRS registrada correctamente.";
    } else {
        echo "❌ Error: " . $conn->error;
    }

    $conn->close();
}
?>
