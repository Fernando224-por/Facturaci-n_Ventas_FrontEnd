// Importa la biblioteca axios para realizar solicitudes HTTP
import axios from "axios";

// Crea una instancia de axios con configuraciones específicas
// Establece la URL base para todas las solicitudes realizadas con esta instancia
// Habilita el envío de cookies en las solicitudes, lo cual es necesario para autenticación y sesiones
const instance = axios.create({
    baseURL: 'http://localhost:4050/api', // URL base del servidor API
    withCredentials: true // Permite el envío de cookies en las solicitudes
})

// Exporta la instancia de axios para ser utilizada en otras partes de la aplicación
export default instance;
