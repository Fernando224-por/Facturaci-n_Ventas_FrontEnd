// Importa Formik, Form, Field, y ErrorMessage de la biblioteca Formik para manejar formularios
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Importa archivo RegisterValidations para la validación del formulario
import {registerValidations} from '../../validations/schema.js';

import { registerRequest } from '../../api/auth.js';

function Register() {
  return (
    <div className="register-form sing-up">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={registerValidations} // Usa el esquema de validación importado
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          const result = registerRequest(values);
          console.log(result);
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

export default Register;