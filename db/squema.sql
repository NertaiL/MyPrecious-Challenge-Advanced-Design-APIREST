CREATE DATABASE joyas;
\c joyas;

CREATE TABLE inventario (id SERIAL PRIMARY KEY, nombre VARCHAR(50) NOT NULL, categoria
VARCHAR(50) NOT NULL, metal VARCHAR(50) NOT NULL, precio INT NOT NULL, stock INT NOT NULL);

INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);


ALTER TABLE viajes ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();  ESTE ES PARA SABER CUANDO SE REALIAZO UN INSERTO , OSEA NOS DEJARIA LA FECHA DESDE CUANDO SE AGREGO UN NUEVO REGISTRO
ALTER TABLE viajes ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT NOW();  ESTE NOS DARIA LA FECHA DE CUANDO SE REALIZO


/*Con esta funcion ya podemos obtener las fecha al momento de hacer una actualizacion  */
CREATE FUNCTION update_updated_at_viajes()
RETURNS TRIGGER AS $$  /* trigger ahora es renombrado $$ */
BEGIN /* begin son para las transacciones, el asegura que esto ocurra , de lo contrario el va a hacer un rollback osea va a devolver atras el cambio */
    NEW.updated_at = now();/* new es porque lo va a hacer denuevo y now la fecha y hora */
    RETURN NEW; /* retorna la fecha */
END;
$$ language 'plpgsql';

CREATE TRIGGER update_viajes_updated_at
    BEFORE UPDATE /* antes de actualizar de la tabla viajes  */
    ON
        viajes
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_viajes();/* ejecuta esta funcion que esta aca */
