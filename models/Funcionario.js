const Sequelize = require('sequelize');
const database = require('../db');
const Farmacia = require('./Farmacia');
const FuncionarioFarmacia = require('./FuncionarioFarmacia');

const Funcionario = database.sequelize.define('funcionarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alllowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    permissao_id: {
        type: Sequelize.INTEGER,
        alllowNull: false,

    },
    nif: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    login: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    senha: {
        type: Sequelize.STRING,
        alllowNull: false,

    },
    status_id: {
        type: Sequelize.INTEGER,
        alllowNull: false,
        references: "status",
        referencesKey: 'id',
    }
});

Funcionario.belongsToMany(Farmacia, {
    through: {
        model: FuncionarioFarmacia
    },
    foreignKey: 'funcionario_id',
    constraint: true
});

Farmacia.belongsToMany(Funcionario, {
    through: {
        model: FuncionarioFarmacia
    },
    foreignKey: 'farmacia_id',
    constraint: true
});



Funcionario.hasMany(FuncionarioFarmacia, { foreignKey: 'funcionario_id' });
FuncionarioFarmacia.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });
Farmacia.hasMany(FuncionarioFarmacia, { foreignKey: 'farmacia_id' });
FuncionarioFarmacia.belongsTo(Farmacia, { foreignKey: 'farmacia_id' });






module.exports = Funcionario;