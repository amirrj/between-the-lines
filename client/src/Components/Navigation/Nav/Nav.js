import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = (props) => {
  const navList = ['Home', 'Topics', 'Search', 'MyArticles'];

  const displayNavList = navList.map((i) => {
    return (
      <Link to={`/${i}`} key={i} className="nav__list-item">
        {i}
      </Link>
    );
  });
  return (
    <nav className="nav">
      <ul className="nav__list">{displayNavList}</ul>
    </nav>
  );
};

export default Nav;
