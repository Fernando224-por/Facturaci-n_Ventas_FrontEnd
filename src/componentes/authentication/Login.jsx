// Importa React para usar JSX y componentes de React
import React from 'react';
// Importa Formik, Form, Field, y ErrorMessage de la biblioteca Formik para manejar formularios
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Importa Yup para la validación de formularios
import * as Yup from 'yup';

// Define un esquema de validación para los campos del formulario usando Yup
const validationSchema = Yup.object({
 email: Yup.string()
    .email('The email is not valid') // Valida que el email sea válido
    .required('E-mail is required'), // Marca el email como requerido
 password: Yup.string()
    .required('Password is required'), // Marca la contraseña como requerida
});

// Define el componente Login que renderiza el formulario de inicio de sesión
function Login() {
 return (
    <div className="login-form sing-in">
      <Formik
        // Define los valores iniciales para los campos del formulario
        initialValues={{
          email: '',
          password: '',
        }}
        // Asigna el esquema de validación definido anteriormente
        validationSchema={validationSchema}
        // Maneja el envío del formulario
        onSubmit={(values, { setSubmitting }) => {
          // Imprime los valores del formulario en la consola
          console.log(values);
          // Desactiva el estado de envío para permitir nuevas acciones
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Sing In</h1>
            <span>Use your email and password</span>
            <Field placeholder='Email' type="email" name="email" id="email-login" />
            <ErrorMessage component="span" name="email" />
            <Field placeholder='Password' type="password" name="password" id="password-login" />
            <ErrorMessage component="span" name="password" />
            <a href="#" className='forgot'>Forgot your password?</a>
            <button type="submit" disabled={isSubmitting}>Enter</button>
          </Form>
        )}
      </Formik>
    </div>
 );
}

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login;
