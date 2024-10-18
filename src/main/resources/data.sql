CREATE TABLE IF NOT EXISTS empleado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    edad INT,
    atc VARCHAR(255)
);

INSERT INTO empleado (nombre, apellido, edad, atc) VALUES ('Luis', 'Perez', 30, 'Monterrey');
INSERT INTO empleado (nombre, apellido, edad, atc) VALUES ('Ana', 'Lopez', 25, 'Ciudad de Mexico');
INSERT INTO empleado (nombre, apellido, edad, atc) VALUES ('Pedro', 'Garcia', 29, 'Merida');