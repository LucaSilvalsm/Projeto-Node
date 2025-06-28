const sequelize = require('sequelize');
const conn = require('../Database/database')
const Category = require('../categories/Category')
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
    }

})
// fazendo os relacionamentos entre as tabelas

Article.belongsTo(Category, {foreignKey: 'category_id'});
Category.hasMany(Article, {foreignKey: 'category_id'});
module.exports = Article;