const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const ProductModel = require('./models/product')

// db connect
const sequelize = new Sequelize('karigonnodejs', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

})

// user model
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }) // if force is true, existing table will be dropped
    .then(() => {
        console.log(`Database & tables created!`)
    })

// product model
const Product = ProductModel(sequelize, Sequelize);

sequelize.sync({ force: false }) // if force is true, existing table will be dropped
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    User,
    Product
}