const http = require("http");
const fs = require("fs");
const ws = require("ws");

const app = fs.readFileSync(
  require("path").join(__dirname, "public/index.html")
);
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(app);
});

const wss = new ws.Server({ server });

wss.on("connection", (socket, req) => {
  socket.on("message", (msg) => {
    console.log(`Received: ${msg}`);
    console.log(`From IP: 
      ${req.connection.remoteAddress}`,req.connection.remoteAddress.split(`/\s*,\s*\\`));
    /*const ip = req.headers["x-forwarded-for"].split(/\s*,\s*)[0];
    console.log("Ip from Header", ip);*/
    if (msg === "Hello") socket.send("Websockets!");
  });
});

server.listen(8080);
