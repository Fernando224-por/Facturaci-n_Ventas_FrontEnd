// Importa la instancia de axios configurada para realizar solicitudes HTTP
import instance from "./axios.js";

// Función para registrar un nuevo usuario en el sistema
// @param data: Objeto con los datos del usuario a registrar
export const registerRequest = async (data) => {
  // Realiza una solicitud POST a la ruta "/register" con los datos del usuario
  return await instance.post("/register", data);
}

// Función para iniciar sesión en el sistema
// @param data: Objeto con los datos de inicio de sesión del usuario
export const loginRequest = async (data) => {
  // Realiza una solicitud POST a la ruta "/logIn" con los datos de inicio de sesión
  return await instance.post("/logIn", data);
}

// Función para solicitar el envío de un código de recuperación de contraseña
// @param data: Objeto con el correo electrónico del usuario
export const enterEmailRequest = async (data) => {
  // Realiza una solicitud POST a la ruta "/recoveyPass" con el correo electrónico del usuario
  return await instance.post("/recoveyPass", data);
}

// Función para verificar el código de recuperación de contraseña
// @param data: Objeto con el código de verificación y posiblemente el correo electrónico del usuario
export const confirmCodeRequest = async (data) => {
  // Realiza una solicitud POST a la ruta "/verifyCode" con el código de verificación
  return await instance.post("/verifyCode", data);
}

// Función para cambiar la contraseña del usuario
// @param data: Objeto con la nueva contraseña y posiblemente el correo electrónico del usuario
export const newPasswordRequest = async (data) => {
  // Realiza una solicitud POST a la ruta "/passChange" con la nueva contraseña
  return await instance.post("/passChange", data);
}
