// RegisterValidations.js
import * as Yup from 'yup';


//------------------------------Validacion de gestion de acceso------------------------------

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

export const loginValidations = Yup.object({
  email: Yup.string()
    .email('The email is not valid')
    .required('E-mail is required'),
  password: Yup.string()
    .required('Password is required'),
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


//------------------------------Validacion de gestion de roles------------------------------

export const validationForm = Yup.object({
  name: Yup.string()
    .required('The name of the role is required')
    .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Must be at most 30 characters'),
  description: Yup.string()
    .required('Role description is required')
    .matches(/^[A-Za-z0-9\s.,!?]+$/, 'Only letters, numbers, and punctuation marks are allowed')
    .min(4, 'Must be at least 4 characters')
    .max(150, 'Must be at most 150 characters'),
});
