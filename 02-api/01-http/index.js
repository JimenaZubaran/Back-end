//1.CREAR UN SERVIDOR
const http = require('http');

//2.Crea un servidor local que necesita estar ejecutandose
const server = http.createServer((request, response) => {
    if(request.url == "/dashboard"){
        response.end('hola desde dashboard y compu')  
    }
    console.log('mi primer servidor')
    //Ver como respuesta en el cliente(Navegador)
    response.end('Hola Jime')
});

//3.Método dedicado para estar ejecutando un puerto
server.listen(1234);
console.log('el servidor está corriendo en http://localhost:1234');