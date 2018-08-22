import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  render() {
    const {
      imageLink,
      name,
      accountType
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
            <label htmlFor="avatar-uploader-button">
              <div className="avatar-uploader-button">
                <div className="camera-icon">
                  <FontAwesomeIcon icon="camera" size="2x" />
                </div>
                Change
              </div>
            </label>
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
  isDisabled: PropTypes.bool
}

AvatarUploader.defaultProps = {
  imageLink: '',
  name: '',
  accountType: '',
  isDisabled: false
}

export default AvatarUploader;
