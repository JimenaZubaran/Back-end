const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Product = require('./models/products');
const readFile = promisify(fs.readFile);

mongoose.connect('mongodb://localhost:27017/handCrshop', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/hcshop',  { useNewUrlParser: true });


const init = async () => {
    const filePath = path.resolve(__dirname, 'amazon-handcraf.json');
    const fileData =  await readFile(filePath, { encoding : 'utf8'})

    const handC = JSON.parse(fileData);

    //Convertir de Json a un arreglo de productos para poder recorrerlo   
/*    const handC = JSON.parse(fileData);
    handC.forEach(element => {
        console.log(element);
    });
 */

    const asyncSave = handC.map((handC) => {
        handC.price = +handC.price.slice(1);
        const product = new Product(handC);
        return product.save();
    });   

    const products = await Promise.all(asyncSave);
    console.log(products);

    //console.log(Array.isArray(handC)); //Comprobar que es un array
};

init();