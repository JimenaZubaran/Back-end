//-----------API REST--------------------

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // se necesita conectar a la base de datos para interactuar con ella 
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Product = require('./models/products');
const data = require('./data.json');
const server = express();

const port = process.env.PORT || 5688;
mongoose.connect('mongodb://localhost:27017/handCrshop', {useNewUrlParser: true}); //cadena de conexión, credenciales y como acceder


//GET - solicitar: /products (en plural)/ products/:id (1 producto)
//POST - ingresar datos:  /products
//PUT - actualiza un recurso: /product/1 (sobre este elemento vas a editar)
//DELETE - borra dato: /product/1 (identificas que quieres borrar este producto)
//PATCH - actualiza solo 1 recurso
//Recurso: lo que se está solicitando (products)

const filePath = path.resolve(__dirname, 'datas.json');
const writeFile = promisify(fs.writeFile);

const save = content => writeFile(filePath, JSON.stringify(content));
const find = (data, id) => data.find(item => item._id === id); //función
const findIndex = (data, id) => data.findIndex(item => item._id === id);

//parse application/x-www-form-urlencoded - body-parser
server.use(bodyParser.urlencoded({ extended : false }));

// parse application/json - body-parser - mimetype
server.use(bodyParser.json());

//Enable cors()
server.use(cors());

//Get solicitar datos
server.get('/products/', (req, res) =>{
  Product.find()
  .then((products) => {
    res.json(products);
  }); 
});


//Get /products/:id
server.get('/products/:id', (req, res) =>{
    const { id } = req.params;
    //const product = data.find(item => item._id === id);
    const product = find(data, id);
    console.log(product);
    if(!product){
        res.status(404).send('No encontramos el producto');
    }
    res.json(product);
    console.log(req.params);
});



//Post
server.post('/products', (req, res) =>{
    const product = new Product(req.body);
    console.log("PRODUCTO >>>" + product);
    product.save()
    .then((product) => {
        res.json(products);
    });
 
     /* //Se utiliza postman para agregar producto
  console.log(req.body); // manda todos los datos
  // console.log(Object.keys(req));
   const product = {
        _id: `${new Date().getTime()}`,
      ...req.body,
    }
    data.push(product);
    save(data);
    res.json('data')*/
});



//PUT actualizar datos - /products/:id
server.put('/products/:id', (req, res)=> {
    const { id } = req.params;
    const productIndex = findIndex(data, id);
    const product = data[productIndex];

    const newProduct = {
        ...product, //name: "Producto x"
        ...req.body, //{name: Producto x2}
    }

    data[productIndex] = newProduct;
    save(data);
    res.json(newProduct);
});



//DELETE - /products/:id
server.delete('/products/:id', (req, res) => {
    const { id } = req.param;
    const productIndex = findIndex(data, id);
    const product = data[productIndex];

    data.splice(productIndex, 1);
    save(data);

    res.json(product);
});



server.listen (port, () =>{
    console.log(`Servidor está corriendo en http://localhost:${port}`)
})
