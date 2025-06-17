const { DataTypes } = require('serialize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'auditor', 'user'), defaultValue: 'user' }
});

module.exports = User;
