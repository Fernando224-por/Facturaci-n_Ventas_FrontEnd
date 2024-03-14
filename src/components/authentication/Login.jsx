// Importa Formik, Form, y ErrorMessage de la biblioteca Formik para manejar formularios
import { Formik, Form, ErrorMessage } from 'formik';
// Importa useNavigate de react-router-dom para manejar la navegación entre páginas
import { useNavigate } from 'react-router-dom';
// Importa el esquema de validación para el formulario de inicio de sesión
import { loginValidations } from '../../validations/schema.js';
// Importa la función para realizar la solicitud de inicio de sesión
import { loginRequest } from '../../api/auth.js';

import { useAuthStore } from '../../state/login.state.js';
// Importa funciones para manejar mensajes de éxito y error
import { processSuccess, processError } from '../toaster/toaster.js';

// Define el componente Login que renderiza el formulario de inicio de sesión
function Login() {
  // Hook para la navegación entre páginas
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.loginUser)

  return (
    <div className="login-form sing-in">
      <Formik
        // Define los valores iniciales para los campos del formulario
        initialValues={{
          email: '',
          password: '',
        }}
        // Asigna el esquema de validación definido anteriormente
        validationSchema={loginValidations}
        // Maneja el envío del formulario
        onSubmit={async (values) => {
          try {
            // Realiza la solicitud de inicio de sesión con los valores del formulario
            const res = await loginRequest(values);
            await logIn(values)
            // Muestra un mensaje de éxito con la respuesta del servidor
            processSuccess(res.data.message);
            // Redirige al usuario al dashboard
            navigate('/dashboard');
          } catch (error) {
            // Muestra un mensaje de error si la solicitud falla
            processError(error.response.data.message);
            // Redirige al usuario a la página principal en caso de error
            navigate('/');
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h1>Sing In</h1>
            <span>Use your email and password</span>
            {/* Campo para el correo electrónico */}
            <input placeholder='Email' type="email" name="email" id="email-login"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="email" />
            {/* Campo para la contraseña */}
            <input placeholder='Password' type="password" name="password" id="password-login"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="password" />
            {/* Enlace para restablecer la contraseña */}
            <span
              className='forgot'
              onClick={() => {
                // Utiliza la navegación programática para redirigir al usuario a la página de restablecimiento de contraseña
                navigate('/resetpassword');
              }}
            >
              Forgot your password?
            </span>
            {/* Botón para enviar el formulario */}
            <button type="submit">Enter</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login;
