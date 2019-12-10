// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var express = require('express');
var app = express();
var http = require('http').Server(app); //1
var io = require('socket.io')(http);    //1
var id = "";
app.get('/',function(req, res){  //2
  console.log(req.query);
  id = req.query.id;
  res.sendFile(__dirname + '/client.html');
});

var count=1;
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = "user" + count++;   
  if(name!=null) {name = id;}              //3-1
  io.to(socket.id).emit('change name',name);   //3-1

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg);
  });
});
var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;

//http.listen(process.env.port || 8000, function(){ //4
http.listen(server_port, function(){ //4
	console.log('server on! listening '+server_port);	
//  console.log('server on! listening '+process.env.port+' || 8000');
});
function saveData (Account, msg){
// array 1000 개 만들어서 이전 1000개의 대화명/대화 저장해서 누구 접속할때마다 띄워줄것

}
