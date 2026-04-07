import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ');

    if (!token) return res.status(401).json({ error: "No autorizado. Inicia sesión." });

    try {
        // Validamos con la misma clave del index.js
        const decoded = jwt.verify(token, 'secret_key_m8');
        req.user = decoded;
        next(); // Si el token es válido, pasa al proceso de Multer
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};