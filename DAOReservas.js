"use strict"


class DAOReservas {
    constructor(pool) {
        this.pool = pool;
    }


    getAllRes(email, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos"));
            else { }
        })
    }
    insertRes(idDestino, user, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos"));
            else {
               
                connection.query("INSERT INTO reservas (destino_id, nombre_cliente, correo_cliente, fecha_reserva) VALUES (?, ?, ?, ?);",
                                [idDestino, user.nombre, user.email, user.fecha],
                                function(error, rows){
                                    connection.release();
                                    if(error)
                                        callback(error);
                                    else{
                                        callback(false)       
                                    }
                                });


            }
        })
    }
    deleteCompleted(email, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos"));
            else { }
        })
    }
}

module.exports = DAOReservas