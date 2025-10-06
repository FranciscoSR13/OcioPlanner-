// models/message.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: true });
};
