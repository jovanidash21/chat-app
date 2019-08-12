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
      name,
    } = this.props;
    const avatarStyles = {
      height: size,
      width: size,
      flex: `0 0 ${size}`,
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
      let charCodeSum = 0;

      if ( name && name.length > 0 ) {
        for ( let i = 0; i < name.length; i += 1 ) {
          charCodeSum += name.charCodeAt(i);
        }
      }

      const j = charCodeSum % colors.length;

      avatarStyles.backgroundColor = colors[j];
      avatarStyles.fontSize = Math.floor(parseInt(size, 10) / 2.1);
      avatarStyles.lineHeight = size;
    }

    return avatarStyles;
  }
  handleTopBadge(type='icon') {
    const { roleChatType } = this.props;
    let icon = '';
    let title = '';

    switch ( roleChatType ) {
      case 'admin':
        icon = 'user-cog';
        title = 'This user is an admin';
        break;
      case 'public':
        icon = 'users';
        title = 'This is a public chat room';
        break;
      default:
        break;
    }

    if ( type === 'title' ) {
      return title;
    }
    return icon;
  }
  handleBottomBadge(type='icon') {
    const { accountType } = this.props;
    let icon = '';
    let title = '';

    switch ( accountType ) {
      case 'facebook':
        icon = 'facebook-f';
        title = 'Facebook';
        break;
      case 'google':
        icon = 'google';
        title = 'Google';
        break;
      case 'twitter':
        icon = 'twitter';
        title = 'Twitter';
        break;
      case 'instagram':
        icon = 'instagram';
        title = 'Instagram';
        break;
      case 'linkedin':
        icon = 'linkedin-in';
        title = 'LinkedIn';
        break;
      case 'github':
        icon = 'github';
        title = 'GitHub';
        break;
      default:
        break;
    }

    if ( type === 'title' ) {
      return title;
    }
    return icon;
  }
  render() {
    const {
      image,
      size,
      name,
      username,
      roleChatType,
      accountType,
      badgeBigger,
      badgeCloser,
      showUserTooltip,
    } = this.props;
    const avatarStyles = ::this.handleAvatarStyles();
    let avatarProps = {
      style: avatarStyles,
      title: name,
    };
    const nameAbbr = initials(name).substring(0, 2);
    const topBadgeIcon = ::this.handleTopBadge();
    const topBadgeTitle = ::this.handleTopBadge('title');
    const bottomBadgeIcon = ::this.handleBottomBadge();
    const bottomBadgeTitle = ::this.handleBottomBadge('title');

    if ( showUserTooltip ) {
      avatarProps = {
        ...avatarProps,
        'data-mui-toggle': 'dropdown',
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
            topBadgeIcon.length > 0 &&
            <div
              className={
                "badge-icon top " +
                (badgeBigger ? 'bigger ' : '') +
                (badgeCloser ? 'closer ' : '') +
                roleChatType
              }
              title={topBadgeTitle}
            >
              <FontAwesomeIcon icon={topBadgeIcon} />
            </div>
          }
          {
            bottomBadgeIcon.length > 0 &&
            <div
              className={
                "badge-icon " +
                (badgeBigger ? 'bigger ' : '') +
                (badgeCloser ? 'closer ' : '') +
                accountType
              }
              title={bottomBadgeTitle}
            >
              <FontAwesomeIcon icon={["fab", bottomBadgeIcon]} />
            </div>
          }
        </div>
        {
          showUserTooltip &&
          <UserTooltip
            image={image}
            name={name}
            username={username}
            roleChatType={roleChatType}
            accountType={accountType}
            small={parseInt(size, 10) <= 25}
          />
        }
      </div>
    )
  }
}

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  roleChatType: PropTypes.string,
  accountType: PropTypes.string,
  badgeBigger: PropTypes.bool,
  badgeCloser: PropTypes.bool,
  showUserTooltip: PropTypes.bool,
}

Avatar.defaultProps = {
  image: '',
  size: '25px',
  name: '',
  username: '',
  roleChatType: '',
  accountType: '',
  badgeBigger: false,
  badgeCloser: false,
  showUserTooltip: false,
}

export default Avatar;
