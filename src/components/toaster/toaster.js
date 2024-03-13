// Importa la biblioteca react-hot-toast para mostrar notificaciones en la aplicación
import toast from "react-hot-toast";

// Función para mostrar una notificación de éxito
// @param data: Mensaje a mostrar en la notificación
export const processSuccess = (data) => toast.success(data, {
  // Duración de la notificación en milisegundos
  duration: 4000,
  // Posición de la notificación en la pantalla
  position: 'bottom-right',
  // Icono de la notificación
  icon: '👏'
});

// Función para mostrar una notificación de error
// @param data: Mensaje a mostrar en la notificación
export const processError = (data) => toast.error(data, {
  // Duración de la notificación en milisegundos
  duration: 4000,
  // Posición de la notificación en la pantalla
  position: 'bottom-right',
  // Icono de la notificación
  icon: '⚠️'
});
