const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
require("dotenv").config({ path: "config.env" });
const { addComanda, getComandas, deleteComanda } = require("./utils/comandas");
const app = express();
//Passing the express app to the http server
const server = http.createServer(app);
//Passing the server to socket.io
const io = socketio(server);

let idSocket = "";

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when client connects
//Listen for an event
io.on("connection", (socket) => {
  //Send the new ID to the client
  socket.emit("newID", socket.id);

  socket.on("newComanda", ({ id, dish }) => {
    //Getting the ID from the client to compare
    socket.on("id", (id) => {
      idSocket = id;
    });

    //Avoid making more comandas by doing F5
    let comandas = getComandas();
    //Check if comandas with the same name already exists
    let obj = comandas.find((obj) => obj.id == idSocket || obj.dish == dish);

    //Add the new comanda
    //If not exists add a new one
    if (!obj) {
      comanda = addComanda(socket.id, dish);
      if (comanda) io.emit("addComanda", getComandas());
    } else {
      io.emit("addComanda", getComandas());
    }
  });

  //Delete comanda
  socket.on("deleteComanda", (noComanda) => {
    deleteComanda(noComanda);
    io.emit("addComanda", getComandas());
  });
});

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3000;

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
