import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'muicss/react';
import './styles.scss';

class ErrorCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { label } = this.props;

    return (
      <Panel className="error-card mui--bg-danger">
        <p className="mui--text-center">{label}</p>
      </Panel>
    )
  }
}

ErrorCard.propTypes = {
  label: PropTypes.string.isRequired
}

export default ErrorCard;
