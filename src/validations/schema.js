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
    .required('Password is required')
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
      "The password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and at least 8 characters."
    ),
});

// Define un esquema de validación para los campos del formulario usando Yup
export const loginValidations = Yup.object({
  email: Yup.string()
    .email('The email is not valid') // Valida que el email sea válido
    .required('E-mail is required'), // Marca el email como requerido
  password: Yup.string()
    .required('Password is required'), // Marca la contraseña como requerida
});

export const Reset = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('E-mail is required'),
});

export const ChangePassword = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
      "The password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and at least 8 characters."
    ),
  newPassword: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});