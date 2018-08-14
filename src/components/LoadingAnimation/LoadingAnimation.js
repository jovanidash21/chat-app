import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import './styles.scss';

const LoadingAnimation = (props) => {
  return (
    <div className="loading-animation">
      <Spinner name={props.name} color={props.color} />
    </div>
  );
}

LoadingAnimation.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string
}

LoadingAnimation.defaultProps = {
  color: '#000'
}

export default LoadingAnimation;
