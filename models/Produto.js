const Sequelize = require('sequelize');
const database = require('../db');



const Produto = database.sequelize.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alllowNull: false,
        primaryKey: true
    },

    produto: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    codigo: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    data_compra: {
        type: Sequelize.DATE,
        alllowNull: false,
        
    },
    principio_ativo: {
        type: Sequelize.INTEGER,
        alllowNull: false,

    },
    fornecedor: {
        type: Sequelize.INTEGER,
        alllowNull: false,

    },
    validade: {
        type: Sequelize.DATE,
        alllowNull: false,

    },
    estoque_minimo: {
        type: Sequelize.INTEGER,
        alllowNull: false,

    },
    estoque_maximo: {
        type: Sequelize.INTEGER,
        alllowNull: false,

    },
    situacao: {
        type: Sequelize.INTEGER,
        alllowNull: false,

    },
    valor_de_custo: {
        type: Sequelize.FLOAT,
        alllowNull: false,

    },
    valor_de_venda: {
        type: Sequelize.FLOAT,
        alllowNull: false,

    },
    unidade: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    localizacao_estoque: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    marca: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    tamanho: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    origem: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    tipo: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    descricao: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    imagem: {
        type: Sequelize.BLOB,
        alllowNull: false,

    },


});




module.exports = Produto