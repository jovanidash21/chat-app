import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'muicss/react';
import './styles.scss';

const ErrorCard = (props) => {
  return (
    <Panel className="error-card mui--bg-danger">
      <p className="mui--text-center">{props.label}</p>
    </Panel>
  );
}

ErrorCard.propTypes = {
  label: PropTypes.string.isRequired
}

export default ErrorCard;
