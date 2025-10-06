// models/event.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    datetime: { type: DataTypes.STRING }, // para simplificar guardamos como string ISO
    location: { type: DataTypes.STRING }
  }, { timestamps: true });
};
