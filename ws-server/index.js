const { WebSocketServer } = require("ws");

const server = new WebSocketServer({
  port: 5000,
});

server.on("connection", (socket) => {
  console.log(`Client connected`);
});
