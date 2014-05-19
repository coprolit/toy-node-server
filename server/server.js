var http = require("http");
var url = require("url");
var fs = require("fs");
var io = require('socket.io');

function start(route, handle) {

    var id = 0;

    function sendGameState() {
        // Sending the state of the server to all clients at a fixed rate
        // process world state for emitting:
        if (gameObjectsModel.items.length > 0) {
            //var start = new Date().getTime();
            var data = [];
            for (var i = 0; i < gameObjectsModel.items.length; i++) {
                //var pos = gameObjectsModel.items[i].obj.GetPosition();
                //pos.Set(Math.round(pos.x * 1000) / 1000, Math.round(pos.y * 1000) / 1000);
                //var velocity = gameObjectsModel.items[i].obj.GetLinearVelocity();
                //velocity.Set(Math.round(velocity.x * 1000) / 1000, Math.round(velocity.y * 1000) / 1000);
                /*
                 var item = {
                 'username': gameObjectsModel.items[i].username,
                 'b2Vec2' : gameObjectsModel.items[i].obj.GetPosition(),
                 'angle' : gameObjectsModel.items[i].obj.GetAngle(),
                 'velocity' : gameObjectsModel.items[i].obj.GetLinearVelocity()
                 };
                 */
                // compact the state:
                var str = gameObjectsModel.items[i].username;

                function addToItem(value) {
                    str = str + "&" + value;
                }

                var obj = gameObjectsModel.items[i].obj;
                addToItem(obj.GetPosition().x); // pos x
                addToItem(obj.GetPosition().y); // pos y
                addToItem(obj.GetAngle()); // angle
                addToItem(obj.GetLinearVelocity().x); // velocity x
                addToItem(obj.GetLinearVelocity().y); // velocity y

                data.push(str);
            }
            //io.sockets.volatile.send(data);

            //var end = new Date().getTime();
            //io.sockets.emit('updatecycle', (end - start));
        }
        io.sockets.volatile.send(data);
        //setTimeout(sendGameState, 1000 / 30); // starting update loop
    }

    //sendGameState(); // starting update clients loop;

    function onRequest(request, response) {
        // handles the HTTP request and sends it on to the router:
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        //console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            //console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });

        request.addListener("end", function () {
            route(handle, pathname, response, postData);
        });
    }

    // create server:
    var server = http.createServer(onRequest);
    io = io.listen(server); // io.listen returns a socket.io object to which we can attach our handlers
    io.set('log level', 1); // debug mode off
    server.listen(8080);
    // server and socket are live!

    // socket handling:
    io.sockets.on('connection', function (client) {
        // a client connected
        // 'socket' object = the client

        client.on('disconnect', function () {
            // client disconnected
            // remove references to disconnected if any:
            client.get('username', function (err, name) {
                // client was registered with a username (ship)
                io.sockets.emit('ship destroyed', name); // all other clients remove the ship of the disconnected client
            });
        });

        client.on('ping', function (time) {
            client.emit('pingback', time);
        });
    });

}

exports.start = start;