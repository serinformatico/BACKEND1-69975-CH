import express from "express";
import paths from "./utils/paths.js";
import mongoDB from "./config/mongoose.config.js";
import studentsRouter from "./routes/students.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(paths.public));

// Definición de enrutadores
server.use("/api/students", studentsRouter);

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    mongoDB.connectDB();
});