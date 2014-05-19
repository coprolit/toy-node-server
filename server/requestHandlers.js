var querystring = require("querystring");
var fs = require('fs');

function start(response, postData) {
    //console.log("Request handler 'start' was called.");

    /*
     Having view content right in the request handler is ugly. But here we go:
     */
    /*
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    */
    /*
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                response.writeHead(500);
                return response.end('Error loading index.html');
            }

            response.writeHead(200);
            response.end(data);
        }
    );
    */
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.write('Nothing to see here. <a href="http://www.philippesimpson.com/toy">Please move on</a>');
    response.end();
}

exports.start = start;