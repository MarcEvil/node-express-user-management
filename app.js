import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 1. IMPORTACIÓN DE LA BASE DE DATOS Y RUTAS
import db from './src/config/db.js';
import indexRoutes from './src/routes/index.js';

// Configuración de rutas de archivos para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 2. CONFIGURACIÓN DEL MOTOR DE PLANTILLAS (Handlebars)
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 3. MIDDLEWARES GLOBALES
app.use(express.json()); // Para leer JSON
app.use(express.urlencoded({ extended: true })); // PARA LEER FORMULARIOS POST
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de Logs (Mantenemos tu auditoría del Módulo 6)
app.use((req, res, next) => {
    const logPath = path.join(__dirname, 'logs', 'log.txt');
    const logEntry = `[${new Date().toLocaleString()}] Metodo: ${req.method} - Ruta: ${req.url}\n`;

    fs.appendFile(logPath, logEntry, (err) => {
        if (err) console.error("Error crítico al escribir en el log:", err);
    });
    next();
});

// 4. VINCULACIÓN DE RUTAS
app.use('/', indexRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('home', {
        titulo: "404 - No encontrado",
        mensaje1: "Error 404",
        mensaje2: "La página que buscas no existe."
    });
});

// 5. CONEXIÓN A BASE DE DATOS Y LANZAMIENTO
// En el Módulo 7, sincronizamos la DB antes de escuchar peticiones
async function iniciarServidor() {
    try {
        // Autentica y sincroniza los modelos con las tablas de PostgreSQL
        await db.sync({ force: false });
        console.log('✅ Base de datos sincronizada y conectada.');

        app.listen(PORT, () => {
            console.log(` Servidor funcionando en: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Error fatal al iniciar el servidor:', error);
    }
}

iniciarServidor();