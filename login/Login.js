const sequelize = require('sequelize');
const conn = require('../Database/database')

const Login = conn.define('login',{
      id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
       name: {
         type: Sequelize.STRING,
         allowNull: false
       },
       lastname:{
         type: Sequelize.STRING,
         allowNull: false
       }
})

module.exports = Login;