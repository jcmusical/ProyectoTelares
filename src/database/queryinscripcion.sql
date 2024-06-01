## Tabla inscripciones
## Nombre:
## Email:
## Teléfono:
## Tipo inscripcion (1,2 o 3):


## CREATE DATABASE Telares;

## USE Telares;

CREATE TABLE inscripciones(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    tipo VARCHAR(1) NOT NULL
);

SELECT * FROM inscripciones;