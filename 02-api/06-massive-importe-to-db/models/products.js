const mongoose = require('mongoose');
// se instancia nuevo esquema
const productSchema = new mongoose.Schema ({
    title : {
        type : String,
        unique : true, 
        require : true,
    }, 
    image : String,
    price : String,
    stock : Number,
    
});
const Product = mongoose.model('Product', productSchema); //Nombre de la tabla y el esquema de la tabla
module.exports = Product; 