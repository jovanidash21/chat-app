import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import '../../styles/Header.scss';

const SideBarToggler = (props) => {
  return (
    <div className="side-bar-toggler" onClick={props.handleSideDrawerToggle}>
      <FontAwesome className="icon" name="bars" size="2x" />
      <h2 className="chat-room-name">Chat Room Name</h2>
    </div>
  )
}

SideBarToggler.propTypes = {
  handleSideDrawerToggle: PropTypes.func
}

SideBarToggler.defaultProps = {
  handleSideDrawerToggle: () => {}
}

export default SideBarToggler;
