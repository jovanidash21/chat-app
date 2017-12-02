import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'muicss/react';
import './styles.scss';

const LoginButton = (props) => {
  return (
    <div>
      {
        ((props.type === '') && (!props.isDisabled))
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
            type={props.type}
            variant="raised"
            disabled={props.isDisabled}
          >
            Login
          </Button>
      }
    </div>
  );
}

LoginButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

LoginButton.defaultProps = {
  type: '',
  isDisabled: false
}

export default LoginButton;
