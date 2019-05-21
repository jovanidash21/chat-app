import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-responsive-modal';
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
      center,
      showCloseIcon,
      danger,
      children,
    } = this.props;
    const modalClassNames = {
      modal: "modal " + ( danger ? 'modal-danger ' : '' ) + className,
      closeButton: "close-button",
    };

    return (
      <ReactModal
        classNames={modalClassNames}
        open={open}
        onClose={onClose}
        center={center}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        showCloseIcon={showCloseIcon}
      >
        {children}
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  center: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
  danger: PropTypes.bool,
}

Modal.defaultProps = {
  className: '',
  open: false,
  onClose: () => {},
  center: true,
  showCloseIcon: true,
  danger: false,
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default connect()(Modal);
