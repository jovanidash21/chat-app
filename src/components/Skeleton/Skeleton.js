import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Skeleton = (props) => {
  const skeletonStyles ={
    height: props.height + 'px',
    width: props.width + 'px'
  };

  return (
    <div
      className={
        "skeleton " +
        ( props.circle ? 'circle-skeleton ' : '' ) +
        props.className
      }
      style={skeletonStyles}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  cirlce: PropTypes.bool
}

Skeleton.defaultProps = {
  className: '',
  height: 20,
  width: 100,
  circle: false
}

export default Skeleton;
