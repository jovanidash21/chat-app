import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'muicss/react';
import { Avatar } from '../../Avatar';
import './styles.scss';

class AvatarUploader extends Component {
  constructor(props) {
    super(props);
  }
  handleImageUploadSelect(event) {
    const { handleImageUpload } = this.props;

    handleImageUpload(event.target.files[0]);
  }
  handleRemoveImage(event) {
    event.preventDefault();

    const { handleRemoveImage } = this.props;

    handleRemoveImage();
  }
  render() {
    const {
      imageLink,
      defaultImageLink,
      name,
      roleChatType,
      accountType,
      disabled,
    } = this.props;

    return (
      <div className="avatar-uploader-wrapper">
        <Avatar
          image={imageLink}
          size="120px"
          name={name}
          roleChatType={roleChatType}
          accountType={accountType}
          badgeBigger
          badgeCloser
        />
        {
          (accountType.length === 0 || accountType === 'local') &&
          <div className="avatar-uploader">
            <input
              id="avatar-uploader-button"
              type="file"
              accept="image/*"
              onChange={::this.handleImageUploadSelect}
            />
            <MediaQuery query="(max-width: 767px)">
              {(matches) => {
                return (
                  <Fragment>
                    <label
                      htmlFor="avatar-uploader-button"
                      className={
                        (
                          matches
                            ? 'change-avatar-button mui-btn mui-btn--small button button-default '
                            : 'change-avatar-cover '
                        ) +
                        (disabled ? 'disabled' : '')
                      }
                    >
                      {
                        ! matches &&
                        <div className="camera-icon">
                          <FontAwesomeIcon icon="camera" />
                        </div>
                      }
                      Change
                    </label>
                    {
                      ! matches &&
                      imageLink !== defaultImageLink &&
                      <div
                        className="remove-avatar-button"
                        onClick={::this.handleRemoveImage}
                        title="Remove image"
                      >
                        <div className="remove-icon">
                          <FontAwesomeIcon icon="times" />
                        </div>
                      </div>
                    }
                    {
                      matches &&
                      imageLink !== defaultImageLink &&
                      <Button
                        color="danger"
                        size="small"
                        onClick={::this.handleRemoveImage}
                        disabled={disabled}
                      >
                        Remove
                      </Button>
                    }
                  </Fragment>
                )
              }}
            </MediaQuery>
          </div>
        }
      </div>
    )
  }
}

AvatarUploader.propTypes = {
  imageLink: PropTypes.string,
  defaultImageLink: PropTypes.string,
  name: PropTypes.string,
  roleChatType: PropTypes.string,
  accountType: PropTypes.string,
  handleImageUpload: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

AvatarUploader.defaultProps = {
  imageLink: '',
  defaultImageLink: '',
  name: '',
  roleChatType: '',
  accountType: '',
  disabled: false,
}

export default AvatarUploader;
