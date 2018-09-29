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
      isModalOpen,
      handleCloseModal,
      isDanger,
      isLoading,
      children
    } = this.props;
    const modalClassNames = {
      modal: "modal " + ( isDanger ? 'modal-danger ' : '' ) + className,
      closeButton: "close-button"
    };

    return (
      <ReactModal
        classNames={modalClassNames}
        open={isModalOpen}
        onClose={handleCloseModal}
        center
        showCloseIcon={!isLoading}
      >
        {
          !isLoading
            ?
            children
            :
            <LoadingAnimation name="ball-clip-rotate" color="black" />
        }
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
  isDanger: PropTypes.bool,
  isLoading: PropTypes.bool
}

Modal.defaultProps = {
  isModalOpen: false,
  isDanger: false,
  isLoading: false
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default connect()(Modal);
