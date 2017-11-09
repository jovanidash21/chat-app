import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import FontAwesome from 'react-fontawesome';

class SocialButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      socialMedia,
      label,
      handleSocialLogin,
      isDisabled
    } = this.props;

    return (
      <Button
        className={`button button-${socialMedia}`}
        size="large"
        variant="raised"
        onClick={handleSocialLogin}
        disabled={isDisabled}
      >
        <div className="icon">
          <FontAwesome
            name={socialMedia}
            size="2x"
          />
        </div>
        {label}
      </Button>
    )
  }
}

SocialButton.propTypes = {
  socialMedia: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleSocialLogin: PropTypes.func,
  isDisabled: PropTypes.bool
}

export default SocialButton;
