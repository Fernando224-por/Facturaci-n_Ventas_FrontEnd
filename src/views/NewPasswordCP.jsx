// Importa React y hooks necesarios para el manejo de estado y navegación
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Importa componentes de Formik para manejar el estado y la validación del formulario
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Importa el esquema de validación para el formulario de cambio de contraseña
import { ChangePassword } from '../validations/schema.js'; // Asegúrate de que la ruta sea correcta
// Importa el archivo CSS para estilos del componente
import '../css/AuthenticationCss/NewPasswordST.css';
// Importa un GIF para mostrar en el componente
import NewPasswordGif from '../media/NewPassword.gif';
// Importa la función para solicitar el cambio de contraseña
import { newPasswordRequest } from '../api/auth.js';
// Importa funciones para manejar mensajes de éxito y error
import { processSuccess, processError } from '../components/toaster/toaster.js';

// Componente para el formulario de confirmación de cambio de contraseña
const ConfirmPassword = () => {
  // Hook para la navegación entre páginas
  const navigate = useNavigate();

  return (
    <div className="general-container">
      <img className='gif-NewPassword' src={NewPasswordGif} alt="Password" />
      <div className="confirm-password-container">
        <h2>Enter your new password</h2>
        <Formik
          // Define los valores iniciales del formulario
          initialValues={{
            password: '',
            newPassword: '',
          }}
          // Esquema de validación para los campos del formulario
          validationSchema={ChangePassword}
          // Función que se ejecuta al enviar el formulario
          onSubmit={async (values) => {
            try {
              // Realiza la solicitud de cambio de contraseña con los valores del formulario
              const res = await newPasswordRequest(values);
              // Muestra un mensaje de éxito con la respuesta del servidor
              processSuccess(res.data.message);
              // Redirige al usuario a la página principal
              navigate('/');
            } catch (error) {
              // Muestra un mensaje de error si la solicitud falla
              processError(error.response.data.message);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate>
              {/* Campo para la contraseña actual */}
              <Field type='password' name="password" placeholder="Nueva contraseña" />
              <ErrorMessage component="p" name="password" />
              {/* Campo para la nueva contraseña */}
              <Field type='password' name="newPassword" placeholder="Confirma tu nueva contraseña" />
              <ErrorMessage component="p" name="newPassword" />
              {/* Botón para enviar el formulario */}
              <button type="submit">Confirmar</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

// Exporta el componente ConfirmPassword para su uso en otras partes de la aplicación
export default ConfirmPassword;
