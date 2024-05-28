CREATE DATABASE Telares;

USE Telares;

CREATE TABLE productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    referencia VARCHAR(50) NOT NULL,
    tipotelar VARCHAR(50) NOT NULL,
    precio INT,
    descripcion TEXT
);

SELECT * FROM productos;