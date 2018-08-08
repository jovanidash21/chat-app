import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../../../components/Avatar';
import './styles.scss';

class OptionsDropdown extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;

    return (
      <div className="mui-dropdown options-dropdown">
        <div className="dropdown-toggle" data-mui-toggle="dropdown">
          <Avatar
            image={user.profilePicture}
            size="32px"
            title={user.name}
            accountType={user.accountType}
          />
        </div>
        <ul className="dropdown-menu mui-dropdown__menu mui-dropdown__menu--right">
          <li>
            <form action="/api/logout" method="post">
              <input type="submit" value="Logout" />
            </form>
          </li>
        </ul>
      </div>
    )
  }
}

OptionsDropdown.propTypes = {
  user: PropTypes.object.isRequired
}

export default OptionsDropdown;
