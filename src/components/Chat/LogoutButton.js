import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';

class LogoutButton extends Component {
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
      <Button
        className="button button-logout"
        color="danger"
        size="large"
        type="submit"
        variant="raised"
        onClick={handleLogout}
      >
        Logout
      </Button> 
    ) 
  }
}

LogoutButton.propTypes={
  handleLogout: PropTypes.func.isRequired
}

export default LogoutButton;