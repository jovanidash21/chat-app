import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-responsive-modal';
import { LoadingAnimation } from '../LoadingAnimation';
import { Header } from './Header';
import { Body } from './Body';
import { Footer } from './Footer';
import './styles.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      className,
      open,
      onClose,
      showCloseIcon,
      danger,
      loading,
      children
    } = this.props;
    const modalClassNames = {
      modal: "modal " + ( danger ? 'modal-danger ' : '' ) + className,
      closeButton: "close-button"
    };

    return (
      <ReactModal
        classNames={modalClassNames}
        open={open}
        onClose={onClose}
        center
        closeOnEsc={false}
        closeOnOverlayClick={false}
        showCloseIcon={showCloseIcon && !loading}
      >
        {
          !loading
            ?
            children
            :
            <Body>
              <LoadingAnimation name="ball-clip-rotate" color="black" />
            </Body>
        }
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  danger: PropTypes.bool,
  loading: PropTypes.bool
}

Modal.defaultProps = {
  className: '',
  open: false,
  onClose: () => {},
  showCloseIcon: true,
  danger: false,
  loading: false
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default connect()(Modal);
