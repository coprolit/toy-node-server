/*
 Responding request handlers with non-blocking operations:
 Instead of bringing the content to the server, we will bring the server to the content.
 To be more precise, we will inject the response object (from our server's callback function onRequest()) through the router into the request handlers.
 The handlers will then be able to use this object's functions to respond to requests themselves.
 server > router > request handler
 */

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;

// start the server:
server.start(router.route, handle);