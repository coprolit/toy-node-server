/**
 * Created by Philippe Simpson on 24-05-2014.
 */
    /*
var express = require('express');
var app = express();
*/
var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

server.listen(80, function(){
    console.log('Express server started on port %s', server.address().address + ":" + server.address().port);
});

/*
app.get('/', function(req, res){
    res.send('hello world');
    console.log("client connected");
});
*/
// respond
app.get("/", function(req, res, next){
    //res.send('Hello World');
    res.sendfile('index.html')
});

app.get("/js/socket.io.min.js", function(req, res, next){
    res.sendfile('js/socket.io.min.js')
});

// simple logger
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
/*
var server = app.listen(3000, function(){
    console.log('Express server started on port %s', server.address().address + ":" + server.address().port);
});
*/
io.sockets.on('connection', function(socket) {
    // do all of your socket work in here

});