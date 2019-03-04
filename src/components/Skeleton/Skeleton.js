import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Skeleton = (props) => {
  const skeletonStyles ={
    height: props.height + 'px',
    width: props.width + 'px'
  };

  return (
    <div
      className="skeleton"
      style={skeletonStyles}
    />
  );
}

Skeleton.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
}

Skeleton.defaultProps = {
  height: 20,
  width: 100
}

export default Skeleton;
