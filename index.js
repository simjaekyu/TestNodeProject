var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/nodeClass"] = requestHandlers.nodeClass;
handle["/getMethodTest"] = requestHandlers.getMethodTest;
handle["/postMethodTest"] = requestHandlers.postMethodTest;

server.start(router.route, handle);