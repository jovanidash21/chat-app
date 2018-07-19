import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import initials from 'initials';
import './styles.scss';

class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  handleAvatarStyles() {
    const {
      image,
      size,
      title
    } = this.props;
    var avatarStyles = {
      height: size,
      width: size,
      flex: `0 0 ${size}`
    };
    const colors = [
      '#f85f0d', // blaze orange
      '#57d006', // bright green
      '#304ffe', // blue ribbon
      '#e53935', // cinnabar
      '#d500f9', // electric violet
      '#f05247', // flamingo
      '#4a148c', // persian indigo
      '#f50057', // razzmatazz
      '#2e7d32', // sea green
      '#0d47a1', // tory blue
    ];

    if ( image.length > 0 ) {
      avatarStyles.backgroundImage = `url(${image})`,
      avatarStyles.backgroundSize = size;
    } else {
      var charCodeSum = 0;

      for ( var i = 0; i < title.length; i++ ) {
        charCodeSum += title.charCodeAt(i);
      }

      const j = charCodeSum % colors.length;

      avatarStyles.backgroundColor = colors[j];
      avatarStyles.fontSize = Math.floor(parseInt(size, 10) / 2.5);
      avatarStyles.lineHeight = size;
    }

    return avatarStyles;
  }
  handleBadge(type) {
    const { accountType } = this.props;
    var icon = '';
    var title = '';

    switch ( accountType ) {
      case 'facebook':
        icon = 'facebook-f';
        title = 'Facebook'
        break;
      case 'google':
        icon = 'google';
        title = 'Google'
        break;
      case 'twitter':
        icon = 'twitter';
        title = 'Twitter'
        break;
      case 'instagram':
        icon = 'instagram';
        title = 'Instagram'
        break;
      case 'linkedin':
        icon = 'linkedin-in';
        title = 'LinkedIn'
        break;
      case 'github':
        icon = 'github';
        title = 'GitHub'
        break;
      default:
        break;
    }

    if ( type === 'icon' ) {
      return icon;
    } else if ( type === 'title' ) {
      return title;
    }
  }
  render() {
    const {
      image,
      size,
      title,
      accountType,
      badgeCloser
    } = this.props;
    const avatarStyles = ::this.handleAvatarStyles();
    const nameAbbr = initials(title).substring(0,2);
    const badgeIcon = ::this.handleBadge('icon');
    const badgeTitle = ::this.handleBadge('title');

    return (
      <div
        className="avatar"
        style={avatarStyles}
        title={title}
      >
        {
          image.length === 0 &&
          nameAbbr
        }
        {
          badgeIcon.length > 0 &&
          <div
            className={
              "badge-icon " +
              (badgeCloser ? 'closer ' : '') +
              accountType
            }
            title={badgeTitle}
          >
            <FontAwesomeIcon icon={["fab", badgeIcon]} />
          </div>
        }
      </div>
    )
  }
}

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  badgeCloser: PropTypes.bool
}

Avatar.defaultProps = {
  image: '',
  className: '',
  size: '25px',
  badgeCloser: false
}

export default Avatar;
