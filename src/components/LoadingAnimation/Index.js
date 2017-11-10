import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import './styles.scss';

class LoadingAnimation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      name,
      color
    } = this.props;

    return (
      <div className="loading-animation">
        <Spinner name={name} color={color} />
      </div>
    )
  }
}

LoadingAnimation.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default LoadingAnimation;
