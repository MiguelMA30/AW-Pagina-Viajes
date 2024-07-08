// Importar la configuración del archivo config.js
const config = require("./config");

// Importar el módulo DAODestinos para operaciones de acceso a datos
const DAODestinos = require("./DAODestinos");
const DAOReservas = require("./DAOReservas")

// Importar body-parser para analizar cuerpos de solicitudes HTTP
const bodyparser = require("body-parser");

// Importar módulos necesarios de Express y MySQL
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const sessionMySql = require("express-mysql-session");
const path = require("path");
const { error } = require("console");

// Configurar el almacenamiento de sesiones en MySQL
const MySQLStore = sessionMySql(session);
const sessionStore = new MySQLStore(config.mysqlConfig);

// Crear una instancia de Express
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAODestinos para operaciones de acceso a datos
const daoU = new DAODestinos(pool);
const daoReservas = new DAOReservas(pool);

// Configurar el manejo de archivos estáticos en la carpeta 'public'
const ficherosEstaticos = path.join(__dirname, "public");
app.use(express.static(ficherosEstaticos));

// Configurar body-parser para analizar datos de formularios
app.use(bodyparser.urlencoded({ extended: false }));



// Ruta para manejar la solicitud POST desde un formulario
app.post("/sobreform", function (request, response) {
    console.log(request.body);
    response.redirect("/");
})

// Configurar la ubicación de las vistas y el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para mostrar todos los destinos
app.get("/destinos", function (request, response) {
    daoU.readAllDest(function (error, rows) {
        console.log(rows);
        if (!error) response.render("destinos", { filas: rows })
    })
})

// Ruta para mostrar la página 'sobre'
app.get("/sobre", function (request, response) {
    response.render("sobre")
})

// Ruta para mostrar detalles de un destino específico
app.get("/destino/:id", function (request, response) {
    const id = request.params.id;
    
    daoU.readID(id, function (error, destino) {
        if (error) response.redirect("/destinos");
        else {
            response.render("destino", { destino: destino})
        }
    });
})


app.post("/destino/:id", (request, response) => {
    const datos = request.body;
    const idDestino = request.params.id

    datos.nombre += " " + datos.apellidos

    console.log(datos)
    daoReservas.insertRes(idDestino, datos, (error) => {
        if (error) {
            console.log("Error")
            response.status(500)
        }
        else {
            response.redirect("/destino")
        }
    } )
})



// Ruta principal para mostrar la página de inicio
app.get("/", function (request, response) {
    response.render("login")
})

// Iniciar el servidor en el puerto 3000
app.listen(3000, function (error) {
    if (error) {
        console.log("ERROR")
    } else {
        console.log("Servidor iniciado en el puerto 3000")
    }
})
