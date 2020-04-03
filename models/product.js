const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        price: type.DECIMAL(10, 2),
        productType: type.STRING,
        image: type.STRING,
        logo: type.STRING
    })
}