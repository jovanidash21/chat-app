import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import FontAwesome from 'react-fontawesome';
import {
  Appbar,
  Container
} from 'muicss/react/';
import mapDispatchToProps from '../../actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import Avatar from '../../components/Avatar';
import OnlineIndicator from '../../components/OnlineIndicator';
import OptionsDropdown from '../../components/Header/OptionsDropdown';
import '../../styles/Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  handleAccountType() {
    const {
      user,
      chatRoom
    } = this.props;
    const activeUser = user.active;
    const activeChatRoom = chatRoom.active;
    var accountType = '';

    switch ( activeChatRoom.data.chatType ) {
      case 'private':
        accountType = activeUser.accountType;
        break;
      case 'direct':
        for ( var i = 0; i < activeChatRoom.data.members.length; i++ ) {
          var member = activeChatRoom.data.members[i];

          if ( member._id != activeUser._id ) {
            accountType = member.accountType;
            break;
          } else {
            continue;
          }
        }
        break;
      default:
        break;
    }

    return accountType;
  }
  handleLeftPartHeaderRender() {
    const {
      user,
      chatRoom,
      member,
      handleRightSideDrawerToggleEvent
    } = this.props;

    if (
      !chatRoom.isFetching &&
      chatRoom.isFetchingSuccess &&
      Object.keys(chatRoom.active.data).length > 0
    ) {
      const activeChatRoom = chatRoom.active;

      return (
        <div className="chat-room-detail-wrapper">
          <Avatar
            image={activeChatRoom.data.chatIcon}
            size="32px"
            title={activeChatRoom.data.name}
            accountType={::this.handleAccountType()}
            badgeCloser
          />
          <div className="chat-room-detail">
            <h2
              className="chat-room-name"
              title={activeChatRoom.data.name}
            >
              {activeChatRoom.data.name}
            </h2>
            <div className="chat-room-info">
              {
                ( activeChatRoom.data.chatType === 'public' ||
                activeChatRoom.data.chatType === 'group' ) &&
                !member.isLoading &&
                member.isFetchMembersSuccess &&
                <div
                  className="members-count"
                  onClick={handleRightSideDrawerToggleEvent}
                  title="View Members List"
                >
                  <FontAwesome
                    className="user-icon"
                    name="user"
                  />
                  {member.all.length}
                </div>
              }
              {
                activeChatRoom.data.chatType === 'direct' &&
                !member.isLoading &&
                member.isFetchMembersSuccess &&
                member.all.filter(singleMember =>
                  singleMember._id !== user.active._id
                ).map((singleMember, i) =>
                  <div key={i} className="online-indicator-wrapper">
                    <OnlineIndicator isOnline={singleMember.isOnline} />
                    {singleMember.isOnline ? 'online' : 'offline'}
                  </div>
                )
              }
              {
                activeChatRoom.data.chatType === 'private' &&
                <div className="online-indicator-wrapper">
                  <OnlineIndicator isOnline={true} />
                  online
                </div>
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="white" />
      )
    }
  }
  handleLogout() {
    const {
      user,
      logout
    } = this.props;

    logout(user.active._id);
  }
  render() {
    const {
      user,
      logout,
      handleLeftSideDrawerToggleEvent
    } = this.props;

    return (
      <Appbar className="header">
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                <div className="left-part-header">
                  <MediaQuery query="(max-width: 767px)">
                    <FontAwesome
                      className="hamburger-icon"
                      name="bars"
                      size="2x"
                      onClick={handleLeftSideDrawerToggleEvent}
                    />
                  </MediaQuery>
                  {::this.handleLeftPartHeaderRender()}
                </div>
              </td>
              <td className="mui--appbar-height mui--text-right">
                <OptionsDropdown
                  user={user.active}
                  handleLogout={::this.handleLogout}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    member: state.member
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
