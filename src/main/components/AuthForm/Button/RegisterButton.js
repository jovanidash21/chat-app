import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'muicss/react';

const RegisterButton = (props) => {
  return (
    <div>
      {
        ((props.type === '') && (!props.isDisabled))
          ?
          <Link to="/register">
            <Button
              className='button button-register'
              size="large"
              variant="raised"
              disabled={false}
            >
              Register
            </Button>
          </Link>
          :
          <Button
            className='button button-register'
            size="large"
            type={props.type}
            variant="raised"
            disabled={props.isDisabled}
          >
            Register
          </Button>
      }
    </div>
  );
}

RegisterButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

RegisterButton.defaultProps = {
  type: '',
  isDisabled: false
}

export default RegisterButton;
