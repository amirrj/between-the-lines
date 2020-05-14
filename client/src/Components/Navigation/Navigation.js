import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../Redux/Actions/AuthActions';

import NavIcon from './NavIcon/NavIcon';
import MobileNav from './MobileNav/MobileNav';
import Nav from './Nav/Nav';
import LogoImage from '../../Assets/Between-the-lines-full-logo-2.png';
import './Navigation.css';

const Navigation = (props) => {
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);

  const openNavHandler = () => {
    setToggleNav(true);
  };

  const closeNavHandler = () => {
    setToggleNav(false);
  };

  const logOutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navigation">
      <div className="navigation__bar">
        <img
          className="navigation__bar-logo"
          src={LogoImage}
          alt="between the lines logo"
        />
        <Nav logout={logOutHandler} />
        <NavIcon
          isOpen={toggleNav}
          openNav={openNavHandler}
          closeNav={closeNavHandler}
        />
      </div>
      <MobileNav
        logout={logOutHandler}
        closeNav={closeNavHandler}
        isOpen={toggleNav}
      />
    </div>
  );
};

export default Navigation;
