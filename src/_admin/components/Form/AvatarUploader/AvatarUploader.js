import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import { Avatar } from '../../../../components/Avatar';
import { Modal } from '../../../../components/Modal';
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
      name,
      accountType,
      isDisabled
    } = this.props;

    return (
      <div className="avatar-uploader-wrapper">
        <Avatar
          image={imageLink}
          size="120px"
          title={name}
          accountType={accountType}
          badgeBigger
          badgeCloser
        />
        {
          accountType === 'local' &&
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
                (isDisabled ? 'disabled' : '')
              }
            >
              Change
            </label>
            {
              imageLink.length > 0 &&
              <Button
                color="danger"
                size="small"
                onClick={::this.handleRemoveImage}
                disabled={isDisabled}
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
  name: PropTypes.string,
  accountType: PropTypes.string,
  handleImageUpload: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
}

AvatarUploader.defaultProps = {
  imageLink: '',
  name: '',
  accountType: '',
  isDisabled: false
}

export default AvatarUploader;
