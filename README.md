-- Crear la base de datos
CREATE DATABASE perfumeria_db

-- Seleccionar la base de datos
USE perfumeria_db;

-- Tabla: contactanos
CREATE TABLE `contactanos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(150) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: pedidos
CREATE TABLE `pedidos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ProductId` INT NOT NULL,
  `ValorUnitario` INT NOT NULL,
  `Cantidad` INT NOT NULL,
  `Total` INT NOT NULL,
  `NombreCliente` VARCHAR(100) NOT NULL,
  `CorreoCliente` VARCHAR(150) NOT NULL,
  `DireccionEnvio` VARCHAR(200) NOT NULL,
  `MetodoPago` ENUM('tarjeta','efectivo','transferencia') NOT NULL,
  `Estado` ENUM('pendiente','pagado','enviado','entregado') DEFAULT 'pendiente',
  `Fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: pqrs
CREATE TABLE `pqrs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(150) NOT NULL,
  `tipo` ENUM('pregunta','queja','reclamo','sugerencia') NOT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: productos
CREATE TABLE `productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `detalle` VARCHAR(255) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: trabaja
CREATE TABLE `trabaja` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` VARCHAR(150) NOT NULL,
  `telefono` VARCHAR(20) DEFAULT NULL,
  `mensaje` TEXT NOT NULL,
  `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: usuarios
CREATE TABLE `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) DEFAULT NULL,
  `correo` VARCHAR(100) DEFAULT NULL,
  `contraseña` VARCHAR(255) DEFAULT NULL,
  `rol` VARCHAR(20) DEFAULT 'usuario',
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: ventas
CREATE TABLE `ventas` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ProductoId` INT NOT NULL,
  `NombreCliente` VARCHAR(100) NOT NULL,
  `CorreoCliente` VARCHAR(150) NOT NULL,
  `Fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `ProductoId` (`ProductoId`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`ProductoId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
