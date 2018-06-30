import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

const OnlineIndicator = (props) => {
  return (
    <div className={"online-indicator " + (props.isOnline ? 'online' : '')}>
      <FontAwesomeIcon
        className="circle-icon"
        icon={props.isOnline ? 'circle' : ["far", "circle"]}
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
