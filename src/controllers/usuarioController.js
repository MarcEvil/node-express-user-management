import Usuario from '../models/Usuario.js';

/**
 * Lógica para obtener todos los usuarios (SELECT * FROM Usuarios)
 */
export const obtenerUsuarios = async (req, res) => {
    try {
        // Obtenemos los usuarios de PostgreSQL
        const usuariosInstancias = await Usuario.findAll();

        // Convertimos a objetos planos para que HBS no tenga problemas de acceso
        const usuarios = usuariosInstancias.map(user => user.get({ plain: true }));

        res.render('usuarios', {
            titulo: 'Lista de Usuarios SQL',
            tituloReg: 'Registrar un nuevo usuario',
            empresa: "Tech Solutions",
            usuarios // Pasamos el arreglo limpio
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).send("Error al cargar la lista de usuarios.");
    }
};

/**
 * Lógica para registrar un nuevo usuario (INSERT INTO Usuarios)
 */
export const registrarUsuario = async (req, res) => {
    try {
        // Extraemos los datos del "name" del formulario
        const { nombre, email, password } = req.body;

        // Insertamos en PostgreSQL
        await Usuario.create({
            nombre: nombre,
            email: email,
            password: password
        });

        // Si todo sale bien, lo mandamos a la lista para que vea su registro
        res.redirect('/usuarios');

    } catch (error) {
        console.error("Error al insertar usuario:", error);
        res.status(500).send("Error al guardar el usuario. Verifica si el email ya existe.");
    }
};

// eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Capturamos el ID de la URL

        // Ejecutamos la eliminación en PostgreSQL
        await Usuario.destroy({
            where: { id: id }
        });

        // Redirigimos a la lista para ver el cambio
        res.redirect('/usuarios');
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).send("No se pudo eliminar el usuario.");
    }
};

export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscamos al usuario en PostgreSQL
        const usuario = await Usuario.findOne({ where: { email: email } });

        // 2. Validamos si existe y si la contraseña coincide
        if (usuario && usuario.password === password) {
            // En un sistema real usaríamos JWT o Sessions, 
            // por ahora redirigimos al dashboard de éxito.
            res.redirect('/usuarios');
        } else {
            // Si falla, podrías pasar un mensaje de error a la vista
            res.render('home', { error: "Credenciales inválidas" });
        }
        // Si el login falla:
        res.render('home', {
            error: "Correo o contraseña incorrectos",
            titulo: "Acceso Tech Solutions"
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error interno del servidor");
    }
};