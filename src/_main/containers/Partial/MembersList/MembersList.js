import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../components/LoadingAnimation';
import {
  ChatRoomMemberFilter,
  ChatRoomMember
} from '../../../components/RightSideDrawer';
import './styles.scss';

class MembersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberName: ''
    }
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.isCreating && this.props.chatRoom.isCreatingSuccess ) {
      const { handleRightSideDrawerToggleEvent } = this.props;

      handleRightSideDrawerToggleEvent();
    }
  }
  handleMembersListRender() {
    const {
      user,
      member
    } = this.props;
    const { memberName } = this.state;

    if ( !member.isFetching && member.isFetchingSuccess ) {
      var members = [...member.all];
      var query = memberName.trim().toLowerCase();

      if ( query.length > 0 ) {
        members = members.filter((singleMember) => {
          return singleMember.name.toLowerCase().match(query);
        });
      }

      return (
        <div className="members-list-wrapper">
          <div className="members-count">
            <div className="user-icon">
              <FontAwesomeIcon icon={["far", "user"]} size="2x" />
            </div>
            <h3>
              {member.all.length}&nbsp;
              {member.all.length > 1 ? 'Members' : 'Member'}
            </h3>
          </div>
          <ChatRoomMemberFilter onMemberNameChange={::this.onMemberNameChange} />
          <div className="members-list">
            {
              members.length > 0 &&
              members.sort((a, b) => {
                var name = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                var date = new Date(b.createdAt) - new Date(a.createdAt);

                if ( name !== 0 ) {
                  return name;
                } else {
                  return date;
                }
              }).map((chatRoomMember, i) =>
                <ChatRoomMember
                  key={i}
                  user={user.active}
                  chatRoomMember={chatRoomMember}
                  handleAddDirectChatRoom={::this.handleAddDirectChatRoom}
                />
              )
            }
            {
              members.length === 0 &&
              <div className="no-results">
                No results found
              </div>
            }
          </div>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="white" />
      )
    }
  }
  onMemberNameChange(event) {
    this.setState({memberName: event.target.value});
  }
  handleAddDirectChatRoom(event, memberID) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      createDirectChatRoom,
      changeChatRoom,
      handleRightSideDrawerToggleEvent
    } = this.props;
    const userID = user.active._id;
    const chatRooms = chatRoom.all;
    const activeChatRoom = chatRoom.active;
    var directChatRoomExists = false;
    var directChatRoomData = {};

    for ( var i = 0; i < chatRooms.length; i++ ) {
      if ( chatRooms[i].data.chatType === 'direct' ) {
        var isMembersMatch = chatRooms[i].data.members.some(member => member._id === memberID);

        if ( isMembersMatch ) {
          directChatRoomExists = true;
          directChatRoomData = chatRooms[i];
          break;
        } else {
          continue;
        }
      } else {
        continue;
      }
    }

    if ( ! directChatRoomExists ) {
      createDirectChatRoom(userID, memberID, activeChatRoom.data._id);
    } else {
      changeChatRoom(directChatRoomData, userID, activeChatRoom.data._id);
      handleRightSideDrawerToggleEvent();
    }
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        {::this.handleMembersListRender()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    member: state.member
  }
}

MembersList.propTypes = {
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList);
