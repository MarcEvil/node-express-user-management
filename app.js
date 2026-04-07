import 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from './src/config/db.js';
import indexRoutes from './src/routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Configuración de Handlebars
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Para ver las fotos

// Rutas
app.use('/', indexRoutes);

// Inicio con sincronización de DB
async function iniciar() {
    try {
        // Crear carpeta de subidas si no existe
        if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

        await db.sync({ force: false });
        app.listen(3000, () => console.log('🚀 Servidor M8 listo en http://localhost:3000'));
    } catch (err) {
        console.error('Error al iniciar servidor:', err);
    }
}
iniciar();