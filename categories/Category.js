const Sequelize = require("sequelize")
const conn = require("../Database/database")

const Category = conn.define('categorires',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title :{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
// Category.sync({force: true}) // sincronizando a tabela, force: true para recriar a tabela
module.exports = Category;