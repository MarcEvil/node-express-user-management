import { Sequelize } from 'sequelize';
import 'dotenv/config';

// PRUEBA DE AISLAMIENTO: Escribe tu clave real aquí directamente
const db = new Sequelize('entrega_m7', 'postgres', '@Mojito1982@', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export default db;