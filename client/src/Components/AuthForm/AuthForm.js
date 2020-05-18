import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  registerUser,
  authenticateUser,
} from '../../Redux/Actions/AuthActions';

import './AuthForm.css';

const AuthForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const inputs =
    props.authType === 'signIn'
      ? [
          {
            name: 'email',
            for: 'Email Address',
            inputType: 'email',
            value: email,
            error: errors.email,
          },
          {
            name: 'password',
            for: 'Password',
            inputType: 'password',
            value: password,
            error: errors.password,
          },
        ]
      : [
          {
            name: 'firstName',
            for: 'First Name',
            inputType: 'text',
            value: firstName,
            error: errors.firstName,
          },
          {
            name: 'lastName',
            for: 'Last Name',
            inputType: 'text',
            value: lastName,
            error: errors.lastName,
          },
          {
            name: 'email',
            for: 'Email Address',
            inputType: 'email',
            value: email,
            error: errors.email,
          },
          {
            name: 'password',
            for: 'Password',
            inputType: 'password',
            value: password,
            error: errors.password,
          },
          {
            name: 'password2',
            for: 'Confirm Password',
            inputType: 'password',
            value: password2,
            error: errors.password2,
          },
        ];

  const changeHandler = (e, name) => {
    if (name === 'firstName') {
      setFirstName(e.target.value);
    } else if (name === 'lastName') {
      setLastName(e.target.value);
    } else if (name === 'email') {
      setEmail(e.target.value);
    } else if (name === 'password') {
      setPassword(e.target.value);
    } else if (name === 'password2') {
      setPassword2(e.target.value);
    }
  };

  const form = inputs.map((input) => {
    return (
      <div key={input.name} className="authForm__input-group-item">
        {input.error && <p className="authForm__input-error">{input.error}</p>}
        <label className="authForm__input-label" htmlFor={input.name}>
          {input.for}
        </label>
        <br />
        <input
          className="authForm__input-input"
          type={input.inputType}
          name={input.name}
          value={input.value}
          onChange={(e) => changeHandler(e, input.name)}
        />
        <br />
      </div>
    );
  });

  const text =
    props.authType === 'signIn' ? (
      <p className="authForm__text">
        Need to create an account?{' '}
        <Link className="authForm__text-link" to="/register">
          Click here
        </Link>
      </p>
    ) : (
      <p className="authForm__text">
        Already have an account?{' '}
        <Link className="authForm__text-link" to="/auth">
          Sign in here
        </Link>
      </p>
    );

  const onSubmit = (e) => {
    e.preventDefault();

    if (props.authType === 'signIn') {
      // Sign in onSubmit

      const userData = {
        email,
        password,
      };

      dispatch(authenticateUser(userData, props.history));
    } else if (props.authType === 'register') {
      //  Register onSubmit

      const userData = {
        firstName,
        lastName,
        email,
        password,
        password2,
      };

      dispatch(registerUser(userData, props.history));
    }
  };

  return (
    <form className="authForm">
      <h1 className="authForm__header">BTL</h1>
      <div className="authForm__input-group"> {form} </div>
      <button onClick={onSubmit} type="submit" className="authForm__button">
        Confirm
      </button>
      {text}
    </form>
  );
};

export default AuthForm;
