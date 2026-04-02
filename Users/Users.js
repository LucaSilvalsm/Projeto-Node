const Sequelize = require('sequelize');
const conn = require('../Database/database');

const User = conn.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
    password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;