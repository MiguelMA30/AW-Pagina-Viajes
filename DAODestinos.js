"use strict"


class DAODestinos {
    constructor(pool) {
        this.pool = pool;
    }

    readAllDest(callback) {
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error de conexión a la base de datos"), null);
            }else{
                connection.query("SELECT * FROM `destinos`",
                                [],
                                function(error, rows){
                                    connection.release();
                                    if(error){
                                        callback(error, null);
                                    }else{
                                        let destinos = [];
                                        let id; let nombre; let descripcion; let precio; let imagen;
                                        rows.forEach(element => {
                                            id = element.id;
                                            nombre = element.nombre;
                                            descripcion = element.descripcion;
                                            precio = element.precio;
                                            imagen = element.imagen;
                                            destinos.push({id, nombre, descripcion, precio, imagen})
                                        });
                                            callback(null, rows);
                                    }
                                });
            }
        });
    }
    readID(id,callback){
        this.pool.getConnection(function(error, connection){
            if(error){
                callback(new Error("Error de conexión a la base de datos"), null);
            }else{

                connection.query("SELECT * FROM `destinos` WHERE id=?",
                                [id],
                                function(error, rows){
                                    connection.release();
                                    if(error){
                                        callback(error, null);
                                    }else{
                                        if(rows.length==0){
                                            callback(true,null);
                                        }
                                        else{
                                            let destino={
                                                id : rows[0].id,
                                                nombre : rows[0].nombre,
                                                descripcion : rows[0].descripcion,
                                                precio : rows[0].precio,
                                                imagen : rows[0].imagen
                                            }
                
                                           
                                                callback(null, destino);
                                        }
                                      
                                    }
                                });
            }
        });
    }

}

module.exports = DAODestinos;