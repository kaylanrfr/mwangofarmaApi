const Sequelize = require('sequelize');
const database = require('../db');
const ProdutoEstoque = require('./ProdutoEstoque');
const Produto = require('./Produto');


const Estoque = database.sequelize.define('estoques', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alllowNull: false,
        primaryKey: true
    }
});

Estoque.belongsToMany(Produto, {
    through: {
        model: ProdutoEstoque
    },
    foreignKey: 'estoque_id',
    constraint: true
});

Produto.belongsToMany(Estoque, {
    through: {
        model: ProdutoEstoque
    },
    foreignKey: 'produto_id',
    constraint: true
});



Estoque.hasMany(ProdutoEstoque, { foreignKey: 'estoque_id' });
ProdutoEstoque.belongsTo(Estoque, { foreignKey: 'estoque_id' });
Produto.hasMany(ProdutoEstoque, { foreignKey: 'produto_id' });
ProdutoEstoque.belongsTo(Produto, { foreignKey: 'produto_id' });


module.exports = Estoque