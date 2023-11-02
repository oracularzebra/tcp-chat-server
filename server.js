const net = require('net');

const clients = [];
function broadcast(from, data){
  clients.forEach((c)=>{
    if(from != c) c.write(`${from.remoteAddress} sended ${data}`);
  })
}

const app = net.createServer(socket=>{
  clients.push(socket);
  socket.setEncoding('utf-8')
  broadcast(socket, 'New guest connected\n');
  socket.write('Connected to '+socket.localAddress+'\n', (err)=>{
  })
  socket.write("Welcome to chatz\n")
  socket.on('data', (data)=>{
    if(data.length <= 100) broadcast(socket, data);
  })
})
app.listen({port:2020, host:'127.0.0.1'}, ()=>{
  console.log('listening on', 2020)
})