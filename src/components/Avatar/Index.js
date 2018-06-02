import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

const Avatar = (props) => {
  return (
    <div
      className="avatar"
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: props.size,
        height: props.size,
        width: props.size,
        flex: `0 0 ${props.size}`
      }}
      title={props.title}
    >
      <div
        className={
          "badge-logo " +
          (props.badgeCloser ? 'closer ' : '') +
          props.badgeIcon
        }
      >
        {
          props.badgeIcon.length > 0 &&
          <FontAwesome
            className="icon"
            name={props.badgeIcon}
          />
        }
      </div>
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
  badgeIcon: PropTypes.string,
  badgeCloser: PropTypes.bool
}

Avatar.defaultProps = {
  className: '',
  size: '25px',
  title: '',
  badgeIcon: '',
  badgeCloser: false
}

export default Avatar;
