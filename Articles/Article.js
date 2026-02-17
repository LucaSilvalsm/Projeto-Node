const sequelize = require('sequelize');
const conn = require('../Database/database')
const Category = require('../Category/Category')
const Article = conn.define('article',{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    slug:{
        type: sequelize.STRING,
        allowNull: false
    },
    body:{
        type: sequelize.TEXT,
        allowNull: false
    },
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    category_id: {
        type: sequelize.INTEGER,
        allowNull: false
    }

})
// fazendo os relacionamentos entre as tabelas

Article.belongsTo(Category, {foreignKey: 'category_id'}); // um artigo pertence a uma categoria

Category.hasMany(Article, {foreignKey: 'category_id'});
// uma categoria pode ter muitos artigos

// Article.sync({force: true}) // sincronizando a tabela, force: true para recriar a tabela
module.exports = Article;