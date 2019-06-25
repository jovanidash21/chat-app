import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'muicss/react';

const LoginButton = (props) => {
  if ( props.link.length > 0 ) {
    return (
      <Link
        to={props.link}
        className={
          "mui-btn mui-btn--raised mui-btn--large button button-primary " +
          (props.disabled ? 'disabled' : '')
        }
      >
        Login
      </Link>
    )
  } else {
    return (
      <Button
        className='button button-primary'
        size="large"
        type="submit"
        variant="raised"
        disabled={props.disabled}
      >
        Login
      </Button>
    )
  }
}

LoginButton.propTypes = {
  link: PropTypes.string,
  disabled: PropTypes.bool,
}

LoginButton.defaultProps = {
  link: '',
  disabled: false,
}

export default LoginButton;
