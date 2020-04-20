import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from '../../Assets/Between-the-lines-full-logo-2.png';
import './Landing.css';

const Landing = (props) => {
  const topics = [
    'Sports',
    'Coding',
    'Technology',
    'Beauty',
    'Life',
    'Nature',
    'Science',
    'Maths',
    'History',
    'Politics',
    'Art',
    'Cooking',
    'Javascript',
    'Gaming',
    'Cars',
    'Movies',
  ];

  const display = topics.map((topic, i) => {
    return (
      <div key={i} className="landing__topics-item">
        <p className="landing__topics-item-icon">{topic.charAt(0)}</p>
        <p className="landing__topics-item-text">{topic}</p>
      </div>
    );
  });

  return (
    <div className="landing">
      <img
        className="landing__logo"
        src={LogoImage}
        alt="Between the lines logo"
      />
      <h3 className="landing__title">LEARN. READ .WRITE.</h3>
      <div className="landing__topics">{display}</div>
      <p className="landing__text">
        Simply select the things you love and we'll do the rest.
      </p>
      <Link to="/auth" className="landing__button">
        Get started
      </Link>
    </div>
  );
};

export default Landing;
