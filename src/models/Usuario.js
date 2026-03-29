import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Usuario = db.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

export default Usuario;