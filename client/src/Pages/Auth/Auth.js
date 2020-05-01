import React from 'react';

import LogoImage from '../../Assets/Between-the-lines-full-logo-2.png';
import AuthForm from '../../Components/AuthForm/AuthForm';
import './Auth.css';

const Auth = (props) => {
  let authType;
  if (props.match.path === '/auth') {
    authType = 'signIn';
  } else {
    authType = 'register';
  }

  return (
    <div className="auth">
      <img
        className="auth__logo"
        src={LogoImage}
        alt="Between the lines logo"
      />
      <AuthForm history={props.history} authType={authType} />
    </div>
  );
};

export default Auth;
