import React from 'react';

import './NavIcon.css';

const NavIcon = (props) => {
  const display = props.isOpen ? (
    <div onClick={() => props.closeNav()} className="navIcon-close">
      <div className="navIcon__icon"></div>
      <div className="navIcon__icon"></div>
    </div>
  ) : (
    <div onClick={() => props.openNav()} className="navIcon">
      <div className="navIcon__icon"></div>
      <div className="navIcon__icon"></div>
      <div className="navIcon__icon"></div>
    </div>
  );

  return display;
};

export default NavIcon;
