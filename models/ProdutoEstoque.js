const Sequelize = require('sequelize');
const database = require('../db');



const ProdutoEstoque = database.sequelize.define('produtos_estoques',{
    id :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alllowNull: false,
        primaryKey: true
    },

    // quantidade:{
    //     type: Sequelize.INTEGER,
    //     alllowNull:false,
        
    // },
});




module.exports = ProdutoEstoque