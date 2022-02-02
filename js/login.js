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
  if (divOculto.classList.contains("no_oculto")) {
    divOculto.classList.remove("no_oculto");
    divOculto.classList.add("oculto");
  } else {
    divOculto.getElementsByTagName("form")[0].elements[1].select()
    divOculto.classList.remove("oculto");
    divOculto.classList.add("no_oculto");
  }
}

function loginCorrecto(nick) {
  loginBoton.getElementsByTagName('span')[0].textContent=`${nick}`
  loginBoton.setAttribute("class","login-button");
  document.getElementsByClassName("bi-person-circle")[0].style.color = "green";
  cambiarLoginVisibilidad();
}

function mostrarLoginMensaje(mensaje, color) {
  infoLogin.style.color = color;
  infoLogin.textContent = mensaje;
  infoLogin.classList.remove("oculto");
  infoLogin.classList.add("no_oculto");
  setTimeout(() => {
    infoLogin.classList.remove("no_oculto");
    infoLogin.classList.add("oculto");
  }, 2000);
}

// ############### EVENTOS DE BOTONES ######################
// Boton de Login
loginBoton.addEventListener("click", () => {
  document.getElementsByClassName("bi-person-circle")[0].style.color = "initial";
  loginBoton.getElementsByTagName("span")[0].textContent = "Inicio de sesión";
  cambiarLoginVisibilidad();
});

// Enviar formulario - 'Acceder'
divOculto.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
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
