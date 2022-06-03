const Sequelize = require('sequelize');

const sequelize = new Sequelize('anglofarma', 'tester', 'Qwerty@1',{
    host:"179.158.102.28",
    dialect: 'mysql',
    define:{
        timestamps: false
    }
})

module.exports = {
    sequelize
}







