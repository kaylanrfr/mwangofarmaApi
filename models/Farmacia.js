const Sequelize = require('sequelize');
const database = require('../db');
const Estoque = require('./Estoque');


const Farmacia = database.sequelize.define('farmacias',{
    id :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alllowNull: false,
        primaryKey: true
    },

    endereço:{
        type: Sequelize.STRING,
        alllowNull: false,

    },
    telefone:{
        type: Sequelize.INTEGER,
        alllowNull:false,
        
    },
});

Farmacia.hasMany(Estoque, {
    foreignKey: 'farmacia_id',
    constraint: true
});

module.exports = Farmacia