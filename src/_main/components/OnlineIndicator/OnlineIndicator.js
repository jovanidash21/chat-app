import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

const OnlineIndicator = (props) => {
  return (
    <div className={"online-indicator " + (props.online ? 'online' : '')}>
      <FontAwesomeIcon
        className="circle-icon"
        icon={props.online ? 'circle' : ["far", "circle"]}
      />
    </div>
  );
}

OnlineIndicator.propTypes = {
  online: PropTypes.bool,
}

OnlineIndicator.defaultProps = {
  online: false,
}

export default OnlineIndicator;
