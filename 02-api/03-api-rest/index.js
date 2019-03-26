const express = require('express');
const server = express();
const data = require('./data.json')
const bodyParser = require('body-parser');
const port = process.env.PORT || 5678;
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

//GET - solicitar: /products (en plural)/ products/:id (1 producto)
//POST - ingresar datos:  /products
//PUT - actualiza un recurso: /product/1 (sobre este elemento vas a editar)
//DELETE - borra dato: /product/1 (identificas que quieres borrar este producto)
//PATCH - actualiza solo 1 recurso
//Recurso: lo que se está solicitando (products)

const filePath = path.resolve(__dirname, 'data.json');
const writeFile = promisify(fs.writeFile);

const save = content => writeFile(filePath, JSON.stringify(content));
const find = (data, id) => data.find(item => item._id === id); //función
const findIndex = (data, id) => data.findIndex(item => item._id === id);

//parse application/x-www-form-urlencoded - body-parser
server.use(bodyParser.urlencoded({ extended : false }));

// parse application/json - body-parser - mimetype
server.use(bodyParser.json());


//Get solicitar datos
server.get('/products/', (req, res) =>{
    res.json(data);
})


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
    //Se utiliza postman para agregar producto
  console.log(req.body); // manda todos los datos
  // console.log(Object.keys(req));
   const product = {
        _id: `${new Date().getTime()}`,
      ...req.body,
    }
    data.push(product);
    save(data);
    res.json('data')
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
