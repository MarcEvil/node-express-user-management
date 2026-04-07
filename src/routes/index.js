import { Router } from 'express';
import jwt from 'jsonwebtoken';

// Importamos tus controladores (Ahora 'registrarUsuario' se usará y brillará)
import {
    obtenerUsuarios,
    registrarUsuario,
    eliminarUsuario
} from '../controllers/usuarioController.js';

// Middlewares del Módulo 8
import { upload } from '../middlewares/multer.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();
const SECRET_KEY = 'secret_key_m8'; // Llave maestra compartida

/** --- RUTAS DE NAVEGACIÓN (VISTAS) --- **/
router.get('/', (req, res) => {
    res.render('home', { titulo: "Tech Solutions", mensaje1: "Bienvenido", mensaje2: "Panel de Control" });
});

router.get('/login', (req, res) => res.render('login', { titulo: "Acceso" }));
router.get('/registro', (req, res) => res.render('registro', { titulo: "Registro de Usuarios" }));
router.get('/usuarios', obtenerUsuarios);

/** --- RUTAS DE API (PROCESOS) --- **/

// Login: Genera el Token JWT
router.post('/api/login', (req, res) => {
    const { email, password } = req.body; // Extraemos datos del cuerpo

    if (email === 'marcelo@it.com' && password === '123456') {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ success: true, token });
    }
    res.status(401).json({ error: "Credenciales incorrectas" });
});

/**
 * RUTA CRÍTICA: Subida y Registro
 * 1. verifyToken: Revisa que tengas el JWT.
 * 2. upload.single('archivo'): Guarda la foto físicamente.
 * 3. registrarUsuario: Guarda los datos en PostgreSQL.
 */
router.post('/api/subir', verifyToken, upload.single('archivo'), registrarUsuario);

router.post('/usuarios/eliminar/:id', eliminarUsuario);

export default router;