Script de la base de datos: Ejecutarlo en la base de Datos para que guarden los registros en las Tablas.


CREATE DATABASE perfumeria_db;
USE perfumeria_db;
 

"Tabla pqrs"
CREATE TABLE pqrs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    tipo ENUM('pregunta','queja','reclamo','sugerencia') NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

"tabla trabaja"
CREATE TABLE trabaja (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    mensaje TEXT NOT NULL,
    cv VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

"tabla contactanos"
CREATE TABLE contactanos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);