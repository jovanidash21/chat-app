import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'muicss/react';
import './styles.scss';

const Alert = (props) => {
  return (
    <Panel className="alert mui--bg-danger">
      <p className="mui--text-center">{props.label}</p>
    </Panel>
  );
}

Alert.propTypes = {
  label: PropTypes.string.isRequired
}

export default Alert;
