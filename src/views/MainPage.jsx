// Importa React y el hook useEffect para manejar efectos secundarios en componentes funcionales
import { useEffect } from 'react';
// Importa los componentes Login, Register y Toggle desde la carpeta de componentes de autenticación
import Login from '../components/authentication/Login.jsx';
import Register from '../components/authentication/Register.jsx';
import Toggle from '../components/authentication/Toggle.jsx';
import { useAuthStore } from '../state/login.state.js';
import { useNavigate } from 'react-router-dom';
// Importa el archivo de estilos CSS para el componente App
import '../css/AuthenticationCss/App.css'

// Define el componente principal de la aplicación
function VistaLogin() {
  const isAuth = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()
  // useEffect se ejecuta después de que el componente se haya renderizado en el DOM
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard')
    }
    // Obtiene una referencia al contenedor principal de la aplicación
    const container = document.getElementById('App');
    // Obtiene referencias a los botones de registro y de inicio de sesión
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Función que se ejecuta al hacer clic en el botón de registro
    const handleRegisterClick = () => {
      // Agrega la clase "active" al contenedor para cambiar su estado visual
      container.classList.add("active");
    };

    // Función que se ejecuta al hacer clic en el botón de inicio de sesión
    const handleLoginClick = () => {
      // Elimina la clase "active" del contenedor para revertir su estado visual
      container.classList.remove("active");
    };

    // Agrega los event listeners a los botones de registro y de inicio de sesión
    registerBtn.addEventListener('click', handleRegisterClick);
    loginBtn.addEventListener('click', handleLoginClick);

    // Función de limpieza que se ejecuta al desmontar el componente o antes de volver a ejecutar useEffect
    return () => {
      // Elimina los event listeners para evitar fugas de memoria
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, [isAuth, navigate]); // El array vacío como segundo argumento de useEffect asegura que este efecto se ejecute solo una vez después de la primera renderización

  // Renderiza el componente App con los componentes Register, Login y Toggle
  return (
    <div className='App' id='App'>
      <Register />
      <Login />
      <Toggle />
    </div>
  );
}

// Exporta el componente App para su uso en otras partes de la aplicación
export default VistaLogin;
