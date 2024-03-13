// Importa React y hooks necesarios para el manejo de estado y referencias
import React, { useState, useRef, useEffect } from 'react';
// Importa el hook useNavigate de react-router-dom para la navegación
import { useNavigate } from 'react-router-dom';
// Importa el archivo CSS para estilos del componente
import '../css/AuthenticationCss/ConfirmCodeST.css';
// Importa un GIF para mostrar en el componente
import nuevoMesajeGif from '../media/ConfirmCode.gif';
// Importa la función para confirmar el código de verificación
import { confirmCodeRequest } from '../api/auth.js';
// Importa funciones para manejar mensajes de éxito y error
import { processSuccess, processError } from '../components/toaster/toaster.js';

// Componente para ingresar el código de verificación
const CodeInput = () => {
  // Hook para la navegación entre páginas
  const navigate = useNavigate();
  // Estado para almacenar el código de verificación ingresado por el usuario
  const [code, setCode] = useState(['', '', '', '']);
  // Referencia para manejar los inputs de código
  const inputRefs = useRef([]);

  // Actualiza las referencias de los inputs cuando el código cambia
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, code.length);
  }, [code]);

  // Maneja la entrada de teclas en los inputs para permitir solo números y teclas de navegación
  const handleKeyDown = (index, event) => {
    if (!/[0-9]|Backspace|Tab|Enter|Delete|ArrowLeft|ArrowRight/.test(event.key)) {
      event.preventDefault();
    }
  };

  // Maneja el cambio en los inputs de código, actualizando el estado y enfocando el siguiente input
  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Función para confirmar el código de verificación
  const handleConfirm = async () => {
    if (code.every(digit => digit.length === 1)) {
      const Code = {
        code: Number(code.join('')),
      }
      try {
        const res = await confirmCodeRequest(Code);
        processSuccess(res.data.message);
        navigate('/confirm-password'); // Redirige al usuario a la página de confirmación de contraseña
      } catch (error) {
        processError(error.response.data.message);
      }
    }
  };

  // Renderiza el componente con el formulario de ingreso del código y el GIF
  return (
    <div className='general-container'>
      <div className="input-container">
        <h1>Email Verification</h1>
        <p>We have sent a code to your email</p>
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className="digit-input"
            ref={el => inputRefs.current[index] = el}
          />
        ))}
        <button onClick={handleConfirm} className="confirm-button">
          Confirmar
        </button>
      </div>
      <img className='gif-nuevoMensaje' src={nuevoMesajeGif} alt="Nuevo mensaje" />
    </div>
  );
};

// Exporta el componente CodeInput para su uso en otras partes de la aplicación
export default CodeInput;
