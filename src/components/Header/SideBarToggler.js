import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import FontAwesome from 'react-fontawesome';
import '../../styles/Header.scss';

const SideBarToggler = (props) => {
  return (
    <div className="side-bar-toggler" onClick={props.handleSideDrawerToggle}>
      <MediaQuery query="(max-width: 767px)">
        <FontAwesome className="icon" name="bars" size="2x" />
      </MediaQuery>
      <h2 className="chat-room-name">{props.activeChatRoomData.name}</h2>
    </div>
  )
}

SideBarToggler.propTypes = {
  activeChatRoomData: PropTypes.object.isRequired,
  handleSideDrawerToggle: PropTypes.func
}

SideBarToggler.defaultProps = {
  handleSideDrawerToggle: () => {}
}

export default SideBarToggler;
