// Importa React y el hook useState para manejar el estado local
import React, { useState } from 'react';
// Importa el archivo CSS para estilos de la barra de navegación
import '../css/NavBar.css';
// Importa el ícono de usuario como una variable para su uso en el componente
import userIcon from '../media/IconoUsuario.png';
// Importa el hook de autenticación para acceder a la función de cierre de sesión
import { useAuthStore } from "../state/login.state.js"

// Componente Navbar para la barra de navegación
const Navbar = () => {
    // Estado para controlar la visibilidad del menú desplegable
    const [showDropdown, setShowDropdown] = useState(false);

    // Función para alternar la visibilidad del menú desplegable
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Obtiene la función de cierre de sesión del estado de autenticación
    const logOut = useAuthStore((state) => state.logoutUser)

    // Renderizado del componente Navbar
    return (
        <nav className="navbar">
            <ul className="menu">
                <h1 className="nombre">facturacion y ventas </h1>
                <li className="item"><a href="/roles">Roles</a></li>
                <li className="item"><a href="/users">Usuarios</a></li>
                <li className="item"><a href="#">Blog</a></li>
                <li className="item"><a href="#">Contacto</a></li>
                <li className="toggle"><a href="#"><i className="fas fa-bars"></i></a></li>
            </ul>
            <div className="user-menu" onClick={toggleDropdown}>
                    <img className='userIcon' src={userIcon} alt="User Icon" />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button className='logOut'> Configuracion</button>
                            <button className='logOut' onClick={logOut}>cerrar Sesion</button>
                        </div>
                    )}
                </div>
        </nav>
    );
};

// Exporta el componente Navbar para su uso en otras partes de la aplicación
export default Navbar;
