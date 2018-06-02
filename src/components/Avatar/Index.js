import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './styles.scss';

class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  handleBadgeIcon() {
    const { accountType } = this.props;
    var icon = accountType;

    switch ( accountType ) {
      case 'local':
        icon = '';
        break;
      default:
        break;
    }

    return icon;
  }
  render() {
    const {
      image,
      size,
      title,
      accountType,
      badgeCloser
    } = this.props;
    const badgeIcon = ::this.handleBadgeIcon();

    return (
      <div
        className="avatar"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: size,
          height: size,
          width: size,
          flex: `0 0 ${size}`
        }}
        title={title}
      >
        {
          badgeIcon.length > 0 &&
          <div
            className={
              "badge-logo " +
              (badgeCloser ? 'closer ' : '') +
              accountType
            }
            title={badgeIcon}
          >
            <FontAwesome
              className="icon"
              name={badgeIcon}
            />
          </div>
        }
      </div>
    )
  }
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
  accountType: PropTypes.string.isRequired,
  badgeCloser: PropTypes.bool
}

Avatar.defaultProps = {
  className: '',
  size: '25px',
  title: '',
  badgeCloser: false
}

export default Avatar;
