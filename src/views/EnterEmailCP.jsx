// Importa React y hooks necesarios para el manejo de estado y navegación
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa componentes de Formik para manejar el estado y la validación del formulario
import { Formik, Form, ErrorMessage } from 'formik';
// Importa el esquema de validación para el formulario de restablecimiento de contraseña
import { Reset } from '../validations/schema.js'; // Asegúrate de que la ruta sea correcta
// Importa un GIF para mostrar en el componente
import enterEmailGif from '../media/EnterEmail.gif';
// Importa el archivo CSS para estilos del componente
import '../css/AuthenticationCss/EnterEmailST.css';
// Importa la función para solicitar el restablecimiento de contraseña
import { enterEmailRequest } from '../api/auth.js';
// Importa funciones para manejar mensajes de éxito y error
import { processSuccess, processError } from '../components/toaster/toaster.js';

// Componente para el formulario de restablecimiento de contraseña
function ResetPassword() {
  // Hook para la navegación entre páginas
  const navigate = useNavigate();

  return (
    <div className='general-container-CE'>
      <img className='gif-enterEmail' src={enterEmailGif} alt="Enter email" />
      <div className="Reset_form">
        <Formik
          // Define los valores iniciales del formulario
          initialValues={{
            email: '',
          }}
          // Esquema de validación para los campos del formulario
          validationSchema={Reset}
          // Función que se ejecuta al enviar el formulario
          onSubmit={async (values) => {
            try {
              // Realiza la solicitud de restablecimiento de contraseña con los valores del formulario
              const res = await enterEmailRequest(values);
              // Muestra un mensaje de éxito con la respuesta del servidor
              processSuccess(res.data.message);
              // Redirige al usuario a la página de ingreso del código de verificación
              navigate('/Code');
            } catch (error) {
              // Muestra un mensaje de error si la solicitud falla
              processError(error.response.data.message);
            }
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <h1>Reset password</h1>
              <span>Enter the requested data</span>
              {/* Campo para el correo electrónico */}
              <input placeholder='Email' type="email" name="email" id="email-register"
                onChange={handleChange}
              />
              <ErrorMessage component="span" name="email" />
              {/* Botón para enviar el formulario */}
              <button type='submit'>Siguiente</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

// Exporta el componente ResetPassword para su uso en otras partes de la aplicación
export default ResetPassword;
