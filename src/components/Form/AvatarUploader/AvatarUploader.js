import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import { Avatar } from '../../Avatar';
import { Modal } from '../../Modal';
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
      disabled
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
            <label
              htmlFor="avatar-uploader-button"
              className={
                "mui-btn mui-btn--small button button-default " +
                (disabled ? 'disabled' : '')
              }
            >
              Change
            </label>
            {
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
  disabled: PropTypes.bool
}

AvatarUploader.defaultProps = {
  imageLink: '',
  defaultImageLink: '',
  name: '',
  roleChatType: '',
  accountType: '',
  disabled: false
}

export default AvatarUploader;
