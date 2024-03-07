// RegisterValidations.js
import * as Yup from 'yup';

export const registerValidations = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'No numbers or special characters allowed')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('E-mail is required'),
    password: Yup.string()
        .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W).{8,}$/, 'The password must have more than 8 characters, at least 1 letter, 1 number and a sign.')
        .required('Password is required'),
});

// Define un esquema de validación para los campos del formulario usando Yup
export const loginValidations = Yup.object({
    email: Yup.string()
        .email('The email is not valid') // Valida que el email sea válido
        .required('E-mail is required'), // Marca el email como requerido
    password: Yup.string()
        .required('Password is required'), // Marca la contraseña como requerida
});