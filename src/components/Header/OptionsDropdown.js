import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
require('../../styles/Header.scss');

class OptionsDropdown extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(event) {
    event.preventDefault();

    const { 
      handleLogout 
    } = this.props;

    handleLogout();
  }
  render() {
    const {
      handleLogout
    } = this;

    return (
      <div className="mui-dropdown options-dropdown">
        <button className="mui-btn mui-btn--small mui-btn--fab" data-mui-toggle="dropdown">
          <FontAwesome className="icon" name="ellipsis-v" size="2x" />
        </button>
        <ul className="mui-dropdown__menu mui-dropdown__menu--right">
          <li>
            <a onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    ) 
  }
}

OptionsDropdown.propTypes={
  handleLogout: PropTypes.func.isRequired
}

export default OptionsDropdown;