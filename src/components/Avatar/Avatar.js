import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import initials from 'initials';
import { UserTooltip } from '../UserTooltip';
import './styles.scss';

class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  handleAvatarStyles() {
    const {
      image,
      size,
      name
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

      for ( var i = 0; i < name.length; i++ ) {
        charCodeSum += name.charCodeAt(i);
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
      name,
      username,
      accountType,
      badgeBigger,
      badgeCloser,
      showUserTooltip
    } = this.props;
    const avatarStyles = ::this.handleAvatarStyles();
    var avatarProps = {
      style: avatarStyles,
      title: name
    }
    const nameAbbr = initials(name).substring(0,2);
    const badgeIcon = ::this.handleBadge('icon');
    const badgeTitle = ::this.handleBadge('title');

    if ( showUserTooltip ) {
      avatarProps = {
        ...avatarProps,
        'data-mui-toggle': "dropdown"
      }
    }

    return (
      <div className={showUserTooltip ? 'mui-dropdown' : ''}>
        <div
          className={"avatar " + (showUserTooltip ? 'avatar-tooltip-toggle' : '')}
          {...avatarProps}
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
        {
          showUserTooltip &&
          <UserTooltip
            image={image}
            name={name}
            username={username}
            accountType={accountType}
            isSmall={parseInt(size, 10) <= 25 ? true : false}
          />
        }
      </div>
    )
  }
}

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string.isRequired,
  username: PropTypes.string,
  accountType: PropTypes.string.isRequired,
  badgeBigger: PropTypes.bool,
  badgeCloser: PropTypes.bool,
  showUserTooltip: PropTypes.bool
}

Avatar.defaultProps = {
  image: '',
  size: '25px',
  username: '',
  badgeBigger: false,
  badgeCloser: false,
  showUserTooltip: false
}

export default Avatar;
