import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

const OnlineIndicator = (props) => {
  return (
    <div className={"online-indicator " + (props.isOnline ? 'online' : '')}>
      <FontAwesome
        className="circle-icon"
        name={props.isOnline ? 'circle' : 'circle-thin'}
      />
    </div>
  );
}

OnlineIndicator.propTypes = {
  isOnline: PropTypes.bool
}

OnlineIndicator.defaultProps = {
  isOnline: false
}

export default OnlineIndicator;
