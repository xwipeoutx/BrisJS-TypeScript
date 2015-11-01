var express = require('express');
var http = require('http');

var port = process.env.PORT || 1337;

var app  = express();
app.use('/', express.static(__dirname + '/dist'));

var server = http.createServer(app);

app.listen(port, function() {
	console.log("Server started on port " + port);
});