const comandas = [];

//Join user to chat
function addComanda(id, dish) {
  const comanda = { id, dish };

  comandas.push(comanda);

  return comanda;
}

function deleteComanda(noComanda) {
  comandas.splice(noComanda, 1);
}

//Get comandas
function getComandas() {
  return comandas;
}

module.exports = { addComanda, getComandas, deleteComanda };
