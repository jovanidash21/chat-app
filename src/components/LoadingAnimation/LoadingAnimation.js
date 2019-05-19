import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import './styles.scss';

const LoadingAnimation = (props) => {
  return (
    <div className={"loading-animation " + (props.fullScreen ? 'full-screen' : '')}>
      <Spinner name={props.name} color={props.color} />
    </div>
  );
}

LoadingAnimation.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  fullScreen: PropTypes.bool,
}

LoadingAnimation.defaultProps = {
  color: '#000',
  fullScreen: false,
}

export default LoadingAnimation;
