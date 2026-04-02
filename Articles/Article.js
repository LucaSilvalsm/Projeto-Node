const Sequelize = require('sequelize');
const conn = require('../Database/database');
const Category = require('../Category/Category');

const Article = conn.define('article', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// relacionamentos
Article.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Article, { foreignKey: 'category_id' });
module.exports = Article;

Article.sync();
