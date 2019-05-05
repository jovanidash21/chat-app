import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuButton = (props) => {
  return (
    <div className="menu-button">
      <Link to={props.link} className="mui-btn mui-btn--large button button-default">
        {props.label}
      </Link>
    </div>
  )
}

MenuButton.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
}

MenuButton.defaultProps = {
  label: '',
  link : '/',
}

export default MenuButton;
