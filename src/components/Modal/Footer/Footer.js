import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ModalFooter = (props) => {
  return (
    <div className="modal-footer">
      {props.children}
    </div>
  );
}

export default ModalFooter;
