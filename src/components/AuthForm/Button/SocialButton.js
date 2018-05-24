import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';

const SocialButton = (props) => {
  return (
    <Button
      className={`button button-${props.socialMedia}`}
      size="large"
      variant="raised"
      onClick={props.handleSocialLogin}
      disabled={props.isDisabled}
    >
      <div className="icon">
        <FontAwesome
          name={props.socialMedia}
          size="2x"
        />
      </div>
      {props.label}
    </Button>
  );
}

SocialButton.propTypes = {
  socialMedia: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleSocialLogin: PropTypes.func,
  isDisabled: PropTypes.bool
}

SocialButton.defaultProps = {
  handleSocialLogin: () => {},
  isDisabled: false
}

export default SocialButton;
