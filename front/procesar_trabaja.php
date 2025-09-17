<?php
require "conexion.php";

// Validar que se haya enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre   = $_POST['nombre'];
    $correo   = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $mensaje  = $_POST['mensaje'];

    // Manejo del archivo CV
    $cv = "";
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] == 0) {
        $carpeta = "uploads/";
        if (!file_exists($carpeta)) {
            mkdir($carpeta, 0777, true);
        }
        $cv = $carpeta . basename($_FILES["cv"]["name"]);
        move_uploaded_file($_FILES["cv"]["tmp_name"], $cv);
    }

    // Insertar en la tabla
    $sql = "INSERT INTO trabaja (nombre, correo, telefono, mensaje, cv, fecha) 
            VALUES ('$nombre', '$correo', '$telefono', '$mensaje', '$cv', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "✅ Registro guardado correctamente.";
    } else {
        echo "❌ Error: " . $conn->error;
    }

    $conn->close();
}
?>
