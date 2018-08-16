import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'muicss/react';
import './styles.scss';

const Alert = (props) => {
  return (
    <Panel className={
        "alert alert-" +
        props.type +
        (props.center ? ' mui--text-center': '')
      }
    >
      {props.label}
    </Panel>
  );
}

Alert.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  center: PropTypes.bool
}

Alert.defaultProps = {
  type: 'danger',
  center: false
}

export default Alert;
