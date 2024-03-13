// Importa componentes de Formik para manejar el estado y la validación del formulario
import { Formik, Form, ErrorMessage } from 'formik';
// Importa el esquema de validación para el formulario de registro
import { registerValidations } from '../../validations/schema.js';
// Importa funciones para manejar mensajes de éxito y error
import { processSuccess, processError } from '../toaster/toaster.js';
// Importa la función para realizar la solicitud de registro
import { registerRequest } from '../../api/auth.js';

// Componente para el formulario de registro
function Register() {
  return (
    <div className="register-form sing-up">
      <Formik
        // Define los valores iniciales del formulario
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        // Esquema de validación para los campos del formulario
        validationSchema={registerValidations}
        // Función que se ejecuta al enviar el formulario
        onSubmit={async (values) => {
          try {
            // Realiza la solicitud de registro con los valores del formulario
            const res = await registerRequest(values);
            // Muestra un mensaje de éxito con la respuesta del servidor
            processSuccess(res.data.message);
          } catch (error) {
            // Muestra un mensaje de error si la solicitud falla
            processError(error.response.data.message);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <h1>Sing Up</h1>
            <span>Enter the requested data</span>
            {/* Campo para el nombre */}
            <input placeholder='Name' type="text" name="name" id="name"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="name" />
            {/* Campo para el correo electrónico */}
            <input placeholder='Email' type="email" name="email" id="email-register"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="email" />
            {/* Campo para la contraseña */}
            <input placeholder='Password' type="password" name="password" id="password-register"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="password" />
            {/* Botón para enviar el formulario */}
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Exporta el componente Register para su uso en otras partes de la aplicación
export default Register;
