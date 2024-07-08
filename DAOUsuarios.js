"use strict"
class DAOUsers {
    constructor(pool) {
        this.pool = pool;
        
    }
    getUserImageName(email, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) callback(new Error("Error de conexión a la base de datos"));
            else {
                connection.query(`SELECT img FROM viajes_usuarios WHERE email='${email}'`,
                    (err, rows) => {
                        connection.release();
                        if (err) callback(new Error("Error de acceso a la base de datos"));
                        else {
                            if (rows.length === 0) callback(new Error("No existe el usuario"));
                            else callback(null, rows[0].img);
                        }
                    });
            }
        });
    }
}
module.exports = {
    DAOUsers
}