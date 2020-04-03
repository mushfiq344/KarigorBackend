const express = require('express');
const bodyParser = require('body-parser');
var formidable = require('formidable');
var cors = require('cors')
var mysql = require('mysql');
// dependencies
const { User, Product } = require('./sequelize');



// create express app
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
// Then pass them to cors:


app.use(cors({ origin: [process.env.DASHBOARD_IP, process.env.STORE_IP], credentials: true }));

// define a simple route
app.get('/', (req, res) => {

    // Create a new user
    User.create({ name: "Abir" }).then(jane => {
        console.log("Jane's auto-generated ID:", jane.id);
        res.json({ "message": "Welcome to Ea Notes application. Take notes quickly. Organize and keep track of all your notes." });
    });
});

// post a product
app.post('/product', async (req, res) => {
    var form = new formidable.IncomingForm(),

        fields = {};
    form.on('field', function (field, value) {
        fields[field] = value;
    })
    form.on('fileBegin', function (name, file) {
        var time = Date.now();
        file.path = __dirname + '/public/' + time + '.png';
        fields[name] = 'http://localhost:8080/' + time + '.png';

    });
    form.on('file', function (name, file) {

    })
    form.on('end', async function () {
        console.log('done');
        const product = await Product.create({ name: fields['name'], price: fields['price'], productType: fields['productType'], image: fields['image'], logo: fields['logo'] });

        res.send({ "data": fields })
    });
    form.parse(req);
});

// get all products
app.get('/product/:type', async (req, res) => {

    if (req.params.type == "all") {
        var option = {
            attributes: ['id', 'name', 'price', 'image']
        }
    } else {
        var option = {
            where: { productType: req.params.type.toLowerCase() },
            attributes: ['id', 'name', 'price', 'image']
        }
    }
    const products = await Product.findAll(option);

    res.status(200).json({ "data": products });

});
// get one product by id
app.get('/product/:id', async (req, res) => {

    const product = await Product.findOne({ where: { id: req.params.id } });

    res.status(200).json({ "data": product });

});
// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 3000");
});