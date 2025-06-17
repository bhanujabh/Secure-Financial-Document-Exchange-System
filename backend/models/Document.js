const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Document = sequelize.define('Document', {
  filename: { type: DataTypes.STRING, allowNull: false },
  blobPath: { type: DataTypes.STRING, allowNull: false },
  uploadedBy: { type: DataTypes.STRING },
});

module.exports = { Document };
