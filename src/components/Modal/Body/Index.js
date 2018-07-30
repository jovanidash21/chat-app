import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ModalBody = (props) => {
  return (
    <div className="modal-body">
      {props.children}
    </div>
  );
}

export default ModalBody;
