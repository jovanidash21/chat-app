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
      '#ffc107', // amber
      '#43a047', // apple
      '#FF6F00', // blaze orange
      '#304ffe', // blue ribbon
      '#03a9f4', // cerulean
      '#6200ea', // electric violet
      '#dd2c00', // grenadier
      '#d50000', // guardsman red
      '#afb42b', // lemon butter
      '#64dd17', // lima
      '#f44336', // pomegranate
      '#f50057', // razzmatazz
      '#26c6da', // scooter
      '#f9a825', // sea buckthorn
      '#8e24aa', // seance
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
      avatarStyles.fontSize = Math.floor(parseInt(size, 10) / 2.1);
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
      badgeBigger,
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
              (badgeBigger ? 'bigger ' : '') +
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
  badgeBigger: PropTypes.bool,
  badgeCloser: PropTypes.bool
}

Avatar.defaultProps = {
  image: '',
  className: '',
  size: '25px',
  badgeBigger: false,
  badgeCloser: false
}

export default Avatar;
