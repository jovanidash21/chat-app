import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './styles.scss';

class ChatImageLightBox extends Component {
  constructor(props) {
    super(props);
  }
  handlePrevImage() {
    const {
      images,
      imageIndex,
      handlePrevImage,
    } = this.props;

    const prevImageIndex = (imageIndex + images.length - 1) % images.length;

    handlePrevImage(prevImageIndex);
  }
  handleNextImage() {
    const {
      images,
      imageIndex,
      handleNextImage,
    } = this.props;

    const nextImageIndex = (imageIndex + 1) % images.length;

    handleNextImage(nextImageIndex);
  }
  render() {
    const {
      images,
      imageIndex,
      handleImageLightboxToggle
    } = this.props;

    return (
      <Lightbox
        mainSrc={images[imageIndex].src}
        nextSrc={images.length > 1 ? images[(imageIndex + 1) % images.length].src : ''}
        prevSrc={images.length > 1 ? images[(imageIndex + images.length - 1) % images.length].src : ''}
        onCloseRequest={(e) => handleImageLightboxToggle(images[imageIndex].id)}
        onMovePrevRequest={::this.handlePrevImage}
        onMoveNextRequest={::this.handleNextImage}
      />
    )
  }
}

ChatImageLightBox.propTypes = {
  images: PropTypes.array.isRequired,
  imageIndex: PropTypes.number.isRequired,
  handleImageLightboxToggle: PropTypes.func.isRequired,
  handlePrevImage: PropTypes.func.isRequired,
  handleNextImage: PropTypes.func.isRequired,
}

export default ChatImageLightBox;
