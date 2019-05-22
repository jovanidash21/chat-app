import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Skeleton = (props) => {
  const skeletonStyles = {
    height: props.height,
    width: props.width,
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
  height: PropTypes.string,
  width: PropTypes.string,
  cirlce: PropTypes.bool,
}

Skeleton.defaultProps = {
  className: '',
  height: '20px',
  width: '100px',
  circle: false,
}

export default Skeleton;
