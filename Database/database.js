const Sequelize = require('sequelize');
const conectar = new Sequelize('GuiaNode','postgres','102030',{
    host: 'localhost',
    dialect: 'postgres',
    timezone:'-03:00',
    port: 5432,
    define: {
        timestamps: false
    }
});


module.exports = conectar;