const mongoose = require('mongoose');
// se instancia nuevo esquema
const productSchema = new mongoose.Schema ({
    title : {
        type : String,
        unique : true, 
        require : true
    }, 
    image : String,
    price : String,
    
});
const Product = mongoose.model('Producto', productSchema); //Nombre de la tabla y el esquema de la tabla
//¿C+omo sabe a que  base de daton nos estamos refiriendo?
module.exports = Product; //Se exporta el modelo. éste va a saber a que base de datos nos estamos refiriendo