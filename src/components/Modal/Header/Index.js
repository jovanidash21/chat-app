import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ModalHeader = (props) => {
  return (
    <div className="modal-header">
      {props.children}
    </div>
  );
}

export default ModalHeader;
