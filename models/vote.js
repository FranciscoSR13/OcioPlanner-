// models/vote.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Vote', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    // Pivote userId, optionId creados por las relaciones
  }, { timestamps: true });
};
