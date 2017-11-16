import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'muicss/react';
import './styles.scss';

class LoginButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      type,
      isDisabled
    } = this.props;

    return (
      <div>
        {
          ((type === undefined) && (!isDisabled))
            ?
            <Link to="/">
              <Button
                className='button button-login'
                size="large"
                variant="raised"
                disabled={false}
              >
                Login
              </Button>
            </Link>
            :
            <Button
              className='button button-login'
              size="large"
              type={type}
              variant="raised"
              disabled={isDisabled}
            >
              Login
            </Button>
            
        }
      </div>
    )
  }
}

LoginButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

export default LoginButton;
