// Importa Formik, Form, Field, y ErrorMessage de la biblioteca Formik para manejar formularios
import { Formik, Form, ErrorMessage } from 'formik';
// Importa archivo RegisterValidations para la validación del formulario
import { registerValidations } from '../../validations/schema.js';

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
        onSubmit={async(values) => {
          console.log(values)
          try {
            console.log(values)
            const response = await registerRequest(values)
            console.log(response.data)
          } catch (error) {
            console.error(error.response.data)
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h1>Sing Up</h1>
            <span>Enter the requested data</span>
            <input placeholder='Name' type="text" name="name" id="name"
            onChange={handleChange}
            />
            <ErrorMessage component="span" name="name" />
            <input placeholder='Email' type="email" name="email" id="email-register" 
            onChange={handleChange}
            />
            <ErrorMessage component="span" name="email" />
            <input placeholder='Password' type="password" name="password" id="password-register"
            onChange={handleChange}
            />
            <ErrorMessage component="span" name="password" />
            <button type="submit" >Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;