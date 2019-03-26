//Se manda llamar al móduo de node
const express = require('express');
const packageJson = require('./package.json');


//se ejecuta
const app = express();

//Métodos get de express para acceder a las rutas ("/")
app.get('/home', (req, res)=>{
    res.send('Hola desde HOME ' )
})

app.get('/api/productos', (req, res)=>{
   //res.json(packageJson);
    // res.send('Hola desde PRODUCTOS' )
    res.json([{
        nombre: 'jimena',
        sexo: 'mujer',
        edad: '26',
        nacionalidad : 'mexicana'
    }]);
})

//La pones a escuchar en un puerto
app.listen('4321');

console.log('Servidor corriendo en puerto 4321')

//var router = express.Router()
//https://ull-esit-dsi-1617.github.io/estudiar-las-rutas-en-expressjs-alejandro-raul-35l2/rutasexpressjs.html#using-middleware
//Poniendole un id a cada producto  y marcar el /user/:id'...