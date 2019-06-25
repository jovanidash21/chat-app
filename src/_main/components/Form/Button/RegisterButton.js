import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'muicss/react';

const RegisterButton = (props) => {
  if ( props.link.length > 0 ) {
    return (
      <Link
        to={props.link}
        className={
          "mui-btn mui-btn--raised mui-btn--large button button-register " +
          (props.disabled ? 'disabled' : '')
        }
      >
        Register
      </Link>
    )
  } else {
    return (
      <Button
        className='button button-register'
        size="large"
        type="submit"
        variant="raised"
        disabled={props.disabled}
      >
        Register
      </Button>
    )
  }
}

RegisterButton.propTypes = {
  link: PropTypes.string,
  disabled: PropTypes.bool,
}

RegisterButton.defaultProps = {
  link: '',
  disabled: false,
}

export default RegisterButton;
