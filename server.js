http = require('http');
fs = require('fs');
server = http.createServer( function(request, response) {

    if (request.method == 'POST') {
        console.log("---------------------------------------");
        console.log("POST Request received!");
        var body = '';
        request.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });

        request.on('end', function () {
            console.log("Body: " + body);
        });

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Post Received');
    }
    else
    {
        console.log("---------------------------------------");
        console.log("GET Request received!");
        fs.readFile('questions.json', 'utf8', function(error, contents) {
            if (error) {
                response.writeHead(404);
                response.write("Problem receiving resource");
                console.log('error');
            }
            else {
                response.writeHead(200, {'Content-Type': 'json'});
            }
            response.end(contents);
            console.log('Sent back file contents!');
        });
    }

});

port = 3000;
host = 'localhost';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);