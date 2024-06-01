## Tabla inscripciones
## Nombre:
## Email:
## Teléfono:
## Tipo inscripcion (1,2 o 3):


## CREATE DATABASE Telares;

## USE Telares;

CREATE TABLE inscripciones(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NULL,
    email VARCHAR(50) NULL,
    telefono VARCHAR(20) NULL,
    tipo VARCHAR(1) NULL
);

SELECT * FROM inscripciones;

## Insercion de registros en inscripciones
INSERT INTO inscripciones (nombre, email, telefono, tipo) VALUES ('Erick Montañez', 'Eric@mail.net', '7-9988771', '3');
INSERT INTO inscripciones (nombre, email, telefono, tipo) VALUES ('Ingrid Rodríguez', 'Ingr@mail.net', '7-9988772', '3');
INSERT INTO inscripciones (nombre, email, telefono, tipo) VALUES ('Dayana Alcázar', 'Daya@mail.net', '7-9988773', '1');
INSERT INTO inscripciones (nombre, email, telefono, tipo) VALUES ('Walter Ibáñez', 'Walt@mail.net', '7-9988774', '3');
INSERT INTO inscripciones (nombre, email, telefono, tipo) VALUES ('Luisa Contreras', 'Luis@mail.net', '7-9988775', '2');
INSERT INTO inscripciones (nombre, email, telefono, tipo) VALUES ('Samuel Polo', 'Samu@mail.net', '7-9988776', '3');
