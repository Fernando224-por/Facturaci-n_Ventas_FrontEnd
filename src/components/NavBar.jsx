import React, { useState } from 'react';
import '../css/NavBar.css'; // Importa el archivo CSS para estilos
import userIcon from '../media/IconoUsuario.png'; // Ajusta la ruta según donde hayas colocado el ícono
import { useAuthStore } from "../state/login.state.js"



const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logOut = useAuthStore((state) => state.logoutUser)

    return (
        <nav className="navbar">
            <ul className="menu">
                <h1 className="nombre">facturacion y ventas </h1>
                <li className="item"><a href="#">Acerca de</a></li>
                <li className="item"><a href="#">Servicios</a></li>
                <li className="item"><a href="#">Blog</a></li>
                <li className="item"><a href="#">Contacto</a></li>
                <li className="toggle"><a href="#"><i className="fas fa-bars"></i></a></li>
            </ul>
            <div className="user-menu" onClick={toggleDropdown}>
                    <img className='userIcon' src={userIcon} alt="User Icon" />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button className='logOut' onClick={logOut}>Configuracion</button>
                            <button className='logOut' onClick={logOut}>cerrar Sesion</button>
                        </div>
                    )}
                </div>
        </nav>
    );
};

export default Navbar;
