var http = require("http");
var url = require("url");
var webSocket = require("ws");

var ws = new webSocket('ws://127.0.0.1:6437');

var     five = require('johnny-five'),
    board = new five.Board(),
    led, frame;

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Cesar!");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");

		/*
		 ws.on('message', function(data, flags) {
        frame = JSON.parse(data); 
        if (frame.hands && frame.hands.length > 0) {
            console.log("Hand Detected!");
        }
        else {
            console.log("Waiting...");
        }
    });
    */
    
    
    board.on('ready', function() {
    led = new five.Led(13);    
    ws.on('message', function(data, flags) {
        frame = JSON.parse(data); 
        if (frame.hands && frame.hands.length > 0) {
            led.on();
            console.log("LED ON");
        }
        else {
            led.off();
            console.log("LED OFF");
        }
    });
});
    
    
}

exports.start = start;
