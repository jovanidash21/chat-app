import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appbar } from 'muicss/react/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { UserDropdown } from '../../../../components/UserDropdown';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleLeftSideDrawerToggleEvent } = this.props;

    handleLeftSideDrawerToggleEvent(true);
  }
  render() {
    const {
      user,
      children
    } = this.props;

    return (
      <Appbar className="header">
        <div
          className="hamburger-icon"
          onClick={::this.handleLeftSideDrawerToggleEvent}
        >
          <FontAwesomeIcon icon="bars" size="2x" />
        </div>
        <div className="content">
          {children}
        </div>
        <UserDropdown user={user.active} />
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
