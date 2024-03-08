// Importa Formik, Form, Field, y ErrorMessage de la biblioteca Formik para manejar formularios
import { Formik, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
// Importa Yup para la validación de formularios
import { loginValidations } from '../../validations/schema.js';
import { loginRequest } from '../../api/auth.js';

import { processSuccess, processError } from '../toaster/toaster.js';


// Define el componente Login que renderiza el formulario de inicio de sesión
function Login() {
  const navigate = useNavigate()
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
          // Imprime los valores del formulario en la consola
          try {
            const res = await loginRequest(values)
            processSuccess(res.data.message)
            navigate('/dashboard')
          } catch (error) {
            processError(error.response.data.message)
            navigate('/')
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h1>Sing In</h1>
            <span>Use your email and password</span>
            <input placeholder='Email' type="email" name="email" id="email-login"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="email" />
            <input placeholder='Password' type="password" name="password" id="password-login"
              onChange={handleChange}
            />
            <ErrorMessage component="span" name="password" />
            <a href="#" className='forgot'>Forgot your password?</a>
            <button type="submit">Enter</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login;
