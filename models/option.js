// models/option.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Option', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false }
  }, { timestamps: true });
};
