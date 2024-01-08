var http = require('http');
http.createServer(function(req, res){
res.write("Hello World! This is pershiba learning node js")
res.end()
console.log('server started')
}).listen(8080);