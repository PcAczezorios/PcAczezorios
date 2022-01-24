// Obtener todos los usuarios
function getUsers() {
  localStorage.users = localStorage.users || JSON.stringify([]);
  return JSON.parse(localStorage.users);
}

// Obtener un usuario en específico
function getUser(username) {
  let allUsers = getUsers();
  return allUsers.find((user) => user.username === username);
}

// Añadir nuevo usuario al almacenamiento del navegador
function addUser({ username, pass }) {
  let allUsers = getUsers();
  allUsers.push({ username, pass });
  localStorage.users = JSON.stringify(allUsers);
}