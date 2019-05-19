import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const NotificationCount = (props) => {
  return (
    <div
      className={"notification-count " + (props.small ? 'small' : '')}
      title={props.title}
    >
      {props.count <= 99 ? props.count : '99+'}
    </div>
  );
}

NotificationCount.propTypes = {
  count: PropTypes.number,
  title: PropTypes.string,
  small: PropTypes.bool,
}

NotificationCount.defaultProps = {
  count: 0,
  title: '',
  small: false,
}

export default NotificationCount;
