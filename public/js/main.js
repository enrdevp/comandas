let idSocket = "";
let contador = 0;

//Get dish and room from URL
const { dish } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.on("newID", (id) => {
  idSocket = id;
  socket.emit("id", idSocket);
  socket.emit("newComanda", { idSocket, dish });
});

function deleteComanda(noComanda) {}

socket.on("addComanda", (comandas) => {});
