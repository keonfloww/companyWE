import * as yup from 'yup';
import {t} from 'i18next';
const regExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]*$/;

const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;

const regPhone = /^[0]?[789]\d{9}$/;

export const ruleRequire = {required: true};
export const ruleEmail = {
  required: true,
  pattern: {
    value: regEmail,
    message: 'invalidEmail',
  },
};

const stringField = yup.string().required('required');

const formSchema = () => {
  const passwordField = yup
    .string()
    .required('emptyPasswordError')
    .test('passwordLength', 'passwordLength', val => {
      return val?.length <= AUTH_VALIDATION.PASSWORD_LENGTH;
    });

  const newPasswordField = yup
    .string()
    .required('emptyPasswordError')
    .test('passwordLength', 'newPasswordLength', val => {
      return val?.length <= AUTH_VALIDATION.PASSWORD_LENGTH;
    })
    .test('regex', 'errorPassword', val => {
      return regExp.test(val);
    });

  const confirmPasswordField = yup.string().required('emptyConfirmPassword');

  const loginPasswordField = yup
    .string()
    .required('Mật khẩu không được để trống');

  const phoneField = yup.string().required('Số điện thoại không được để trống');

  const cityField = yup
    .string()
    .test('cityLength', 'errorCityLength', (val: any) => {
      return !val || (val && val?.length <= AUTH_VALIDATION.CITY_LENGTH);
    });

  const loginSchema = yup.object().shape({
    phone: phoneField,
    password: loginPasswordField,
  });

  const forgotPasswordSchema = yup.object().shape({
    email: phoneField,
  });

  const resetPasswordSchema = yup.object().shape({
    password: newPasswordField,
    confirmPassword: confirmPasswordField,
  });

  const registerSchema = yup.object().shape({
    password: passwordField,
    phone: phoneField,
  });

  const registerInfoSchema = yup.object().shape({
    city: cityField,
  });

  const changeUserPasswordSchema = yup.object().shape({
    password: stringField,
    newPassword: passwordField,
    newPasswordConfirmation: stringField,
  });

  const changeUserEmailSchema = yup.object().shape({
    email: phoneField,
  });

  return {
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    registerSchema,
    registerInfoSchema,
    changeUserPasswordSchema,
    changeUserEmailSchema,
  };
};

export default formSchema;
