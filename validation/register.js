const validator = require('validator');
const isEmpty = require('is-empty');

const validateRegister = (data) => {
  const errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }

  if (isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email Address is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password is required';
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be atleast 6 characters long';
  }

  if (isEmpty(data.password2)) {
    errors.password2 = 'Please confirm password';
  } else if (!validator.equals(data.password2, data.password)) {
    errors.password2 = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegister;
