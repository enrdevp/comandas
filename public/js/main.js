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

function deleteComanda(noComanda) {
  console.log(noComanda);
  socket.emit("deleteComanda", noComanda);
}

socket.on("addComanda", (comandas) => {
  let dishes = document.querySelector("#dishes");
  dishes.innerHTML = "";

  //Add each comanda
  comandas.forEach((comanda) => {
    const div = document.createElement("div");
    div.classList.add("dish");
    div.innerHTML = `
    <p id="${comanda.id}">${comanda.dish}</p>
    <button id="btnCancelar" onClick="deleteComanda(${contador})">Cancelar</button>
    <button id="btnTerminada" onClick="deleteComanda(${contador})">Terminada</button>
  `;

    dishes.appendChild(div);
    contador++;
  });
});
