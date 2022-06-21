const net = require('net');

let sockets = [];

const server = net.createServer(socket => {
    sockets.push(socket);
    console.log("A Client has connected");

    socket.on('data', data => {
        sendOut(data, socket);
    });

    socket.on('error', err => {
        console.log("A Client has disconnected")
    });

    socket.on('close', () => {
        console.log("A Client has left the chat");
    } )
});

server.listen(1235);


function sendOut (message, socketSent) {

    if (message.toString() === "quit") {

        const delIndex = sockets.indexOf(socketSent);
        sockets.splice(delIndex, 1);

    } else {

        sockets.forEach(socket => {
            
            if (socket !== socketSent) {
                socket.write(message);
            }

        });
    }
}

