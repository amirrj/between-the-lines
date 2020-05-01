import React from 'react';

import LogoImage from '../../../Assets/Between-the-lines-full-logo-2.png';
import './Loading.css';

const Loading = (props) => {
  return (
    <div className="loading">
      <img
        className="loading__logo"
        src={LogoImage}
        alt="Between the lines logo"
      />
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
