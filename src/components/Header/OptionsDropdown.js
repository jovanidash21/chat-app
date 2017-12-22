import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

class OptionsDropdown extends Component {
  constructor(props) {
    super(props);
  }
  handleLogout(event) {
    event.preventDefault();

    const { handleLogout } = this.props;

    handleLogout();
  }
  render() {
    const { userData } = this.props;

    return (
      <div className="mui-dropdown options-dropdown">
        <MediaQuery query="(min-width: 768px)">
          <div className="user-details">
            <div className="user-picture" style={{backgroundImage: `url(${userData.profilePicture})`}}></div>
            <div className="user-name">
              {userData.name}
            </div>
          </div>
        </MediaQuery>
        <div>
          <button className="mui-btn mui-btn--small mui-btn--fab" data-mui-toggle="dropdown">
            <FontAwesome className="icon" name="ellipsis-v" size="2x" />
          </button>
          <ul className="mui-dropdown__menu mui-dropdown__menu--right">
           <li>
              <a href="#">
                My Profile
              </a>
            </li>
            <li>
              <a onClick={::this.handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

OptionsDropdown.propTypes = {
  userData: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default OptionsDropdown;
