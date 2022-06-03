const Sequelize = require('sequelize');
const database = require('../db');



const FuncionarioFarmacia = database.sequelize.define('funcionarios_farmacias',{
    id :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alllowNull: false,
        primaryKey: true
    }

});



module.exports = FuncionarioFarmacia;