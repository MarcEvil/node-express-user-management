import { Router } from 'express';
// Solo importamos lo que realmente vamos a usar
import {
    obtenerUsuarios,
    registrarUsuario,
    eliminarUsuario
} from '../controllers/usuarioController.js';

const router = Router();

/**
 * 1. HOME (Acceso Directo)
 */
router.get('/', (req, res) => {
    res.render('home', {
        titulo: "Tech Solutions - Dashboard",
        mensaje: "Gestión Administrativa de Usuarios"
    });
});

/**
 * 2. REGISTRO (Vista y Procesamiento)
 */
router.get('/registro', (req, res) => {
    res.render('registro', { titulo: "Nuevo Usuario" });
});

router.post('/registro', registrarUsuario);

/**
 * 3. LISTADO Y ELIMINACIÓN
 */
router.get('/usuarios', obtenerUsuarios);
router.post('/usuarios/eliminar/:id', eliminarUsuario);

export default router;