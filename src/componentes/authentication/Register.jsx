// Importa React para usar JSX y componentes de React
import React from 'react';
// Importa Formik, Form, Field, y ErrorMessage de la biblioteca Formik para manejar formularios
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Importa Yup para la validación de formularios
import * as Yup from 'yup';

import { registerRequest } from '../../api/auth.js';

// Define un esquema de validación para los campos del formulario usando Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'No numbers or special characters allowed') // Valida que el nombre no contenga números o caracteres especiales
    .required('Name is required'), // Marca el nombre como requerido
  email: Yup.string()
    .email('Invalid email address') // Valida que el email sea válido
    .required('E-mail is required'), // Marca el email como requerido
  password: Yup.string()
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W).{8,}$/, 'The password must have more than 8 characters, at least 1 letter, 1 number and a sign.') // Valida que la contraseña cumpla con ciertos requisitos
    .required('Password is required'), // Marca la contraseña como requerida
});

// Define el componente Register que renderiza el formulario de registro
function Register() {
  return (
    <div className="register-form sing-up">
      <Formik
        // Define los valores iniciales para los campos del formulario
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        // Asigna el esquema de validación definido anteriormente
        validationSchema={validationSchema}
        // Maneja el envío del formulario
        onSubmit={async(values, { setSubmitting }) => {
          // Enviar valores
          const result = await registerRequest(values);
          console.log(result);
          // Desactiva el estado de envío para permitir nuevas acciones
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Sing Up</h1>
            <span>Enter the requested data</span>
            <Field placeholder='name' type="text" name="name" id="name" />
            <ErrorMessage component="span" name="name" />
            <Field placeholder='email' type="email" name="email" id="email-register" />
            <ErrorMessage component="span" name="email" />
            <Field placeholder='password' type="password" name="password" id="password-register" />
            <ErrorMessage component="span" name="password" />
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// Exporta el componente Register para su uso en otras partes de la aplicación
export default Register;
