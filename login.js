// ########### FUNCIONES DE ALMACENAMIENTO DE USUARIOS ##############
// Obtener todos los usuarios
function getUsers() {
  localStorage.users = localStorage.users || JSON.stringify([]);
  return JSON.parse(localStorage.users);
}

// intenta encontrar un usuario que coincida con los parametros para el login,
// si no lo encuentra devuelve 'undefined'
function acceder(username, pass) {
  let allUsers = getUsers();
  return allUsers.find(
    (user) => user.username === username && user.pass === pass
  );
}

// Registrar nuevo usuario
function addUser(username, pass) {
  let allUsers = getUsers();
  if (username.length <= 0 || pass.length <= 0) return false;
  allUsers.push({ username, pass });
  localStorage.users = JSON.stringify(allUsers);
  return true;
}

// ############### FUNCIONES DE LOGIN ######################
const loginBoton = document.querySelector("#div_login > button");
const divOculto = document.getElementById("div_oculto_login");
const infoLogin = divOculto.getElementsByTagName("span")[0];

function getDatosFormulario() {
  const nickDiv = divOculto.querySelector("input[type=text]");
  const passDiv = divOculto.querySelector("input[type=password]");
  const user = {
    nick: nickDiv.value,
    pass: passDiv.value,
  };
  nickDiv.value = null;
  passDiv.value = null;
  return user;
}

function cambiarLoginVisibilidad() {
  divOculto.className === "no_oculto"
    ? (divOculto.className = "oculto")
    : (divOculto.className = "no_oculto");
}

function loginCorrecto(nick) {
  loginBoton.textContent = `Usuario: ${nick}`;
  cambiarLoginVisibilidad();
}

function mostrarLoginMensaje(mensaje, color) {
  infoLogin.style.color = color;
  infoLogin.textContent = mensaje;
  infoLogin.className = "no_oculto";
  setTimeout(() => {
    infoLogin.className = "oculto";
  }, 2000);
}

// ############### EVENTOS DE BOTONES ######################
// Boton de Login
loginBoton.addEventListener("click", () => {
  loginBoton.textContent = "Login";
  cambiarLoginVisibilidad();
});

// Enviar formulario - 'Acceder'
divOculto.getElementsByTagName("form")[0].addEventListener("submit", () => {
  const newUser = getDatosFormulario();
  acceder(newUser.nick, newUser.pass)
    ? loginCorrecto(newUser.nick)
    : mostrarLoginMensaje("* Usuario incorrecto", "red");
});

// Boton de registro
divOculto.getElementsByTagName("button")[0].addEventListener("click", () => {
  const newUser = getDatosFormulario();
  addUser(newUser.nick, newUser.pass)
    ? mostrarLoginMensaje("* Registro completado", "green")
    : mostrarLoginMensaje("* Registro incompleto", "red");
});
