import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './MobileNav.css';

const Nav = (props) => {
  const navList = ['Home', 'Topics', 'Search', 'MyArticles', 'Logout'];

  const displayNavList = navList.map((i) => {
    if (i === 'Logout') {
      return (
        <Link
          to="/"
          onClick={() => props.logout()}
          key={i}
          className="mobileNav__list-item"
        >
          {i}
        </Link>
      );
    } else {
      return (
        <Link to={`/${i}`} key={i} className="mobileNav__list-item">
          {i}
        </Link>
      );
    }
  });

  return (
    <CSSTransition
      in={props.isOpen}
      timeout={200}
      classNames="mobileNav-animation"
      unmountOnExit
      mountOnEnter
    >
      <nav className="mobileNav">
        <ul className="mobileNav__list">{displayNavList}</ul>
      </nav>
    </CSSTransition>
  );
};

export default Nav;
