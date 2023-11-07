const { WebSocketServer } = require("ws");

const server = new WebSocketServer({
  port: 5000,
});

server.on("connection", (socket) => {
  console.log(`Client connected`);

  socket.on("message", (data) => {
    const sentData = JSON.parse(data);
    console.log("Message received: ", sentData.message);

    socket.send(`
      <div id="chat_box" hx-swap-oob="beforeend">
        <h3>${sentData.message}</h3>
      </div>
    `);
  });
});
