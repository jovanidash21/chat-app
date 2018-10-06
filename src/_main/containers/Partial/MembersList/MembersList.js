import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { SearchFilter } from '../../../../components/SearchFilter';
import { ChatRoomMember } from '../../../components/RightSideDrawer';
import './styles.scss';

class MembersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      searchFilter: '',
      selectedMemberIndex: -1
    }
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.member.isFetching && !this.props.member.isFetching ) {
      ::this.handleMembersListFilter();
    }

    if ( prevProps.member.all.length !== this.props.member.all.length ) {
      ::this.handleMembersListFilter(this.state.searchFilter);
    }

    if ( prevProps.chatRoom.isCreating && this.props.chatRoom.isCreatingSuccess ) {
      const { handleRightSideDrawerToggleEvent } = this.props;

      handleRightSideDrawerToggleEvent();
      this.setState({
        searchFilter: '',
        selectedMemberIndex: -1
      });
    }
  }
  handleMembersListFilter(searchFilter='') {
    const { member } = this.props;
    const { selectedMemberIndex } = this.state;
    var allMembers = [...member.all];
    var memberIndex = selectedMemberIndex;

    if ( searchFilter.length > 0 ) {
      allMembers = allMembers.filter((singleMember) => {
        return singleMember.name.toLowerCase().match(searchFilter.toLowerCase());
      });

      if ( selectedMemberIndex === -1 ) {
        memberIndex = 0;
      }
    } else {
      allMembers = [...member.all];
      memberIndex = -1;
    }

    this.setState({
      members: allMembers,
      selectedMemberIndex: memberIndex
    });
  }
  handleClearSearchFilter() {
    this.setState({searchFilter: ''});
    ::this.handleMembersListFilter();
  }
  handleMembersListRender() {
    const {
      user,
      member
    } = this.props;
    const {
      members,
      searchFilter,
      selectedMemberIndex
    } = this.state;

     if ( !member.isFetching && member.isFetchingSuccess ) {
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
          <SearchFilter
            value={searchFilter}
            onChange={::this.onMemberNameChange}
            onKeyDown={::this.onMemberNameKeyDown}
            handleClearSearchFilter={::this.handleClearSearchFilter}
            light
          />
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
                  isActive={selectedMemberIndex === i}
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
    const searchFilter = event.target.value;

    this.setState({searchFilter: searchFilter});

    ::this.handleMembersListFilter(searchFilter);
  }
  onMemberNameKeyDown(event) {
    const {
      members,
      selectedMemberIndex
    } = this.state;

    if ( members.length > 0 ) {
      if ( event.keyCode === 38 ) {
        if ( selectedMemberIndex === -1 ) {
          this.setState({selectedMemberIndex: members.length - 1});
        } else {
          this.setState({selectedMemberIndex: selectedMemberIndex - 1});
        }
      }

      if ( event.keyCode === 40 ) {
        if ( selectedMemberIndex === members.length - 1 ) {
          this.setState({selectedMemberIndex: -1});
        } else {
          this.setState({selectedMemberIndex: selectedMemberIndex + 1});
        }
      }

      if ( event.key === 'Enter' && selectedMemberIndex !== -1 ) {
        const selectedMember = members[selectedMemberIndex];

        ::this.handleAddDirectChatRoom(selectedMember._id);
      }
    }
  }
  handleAddDirectChatRoom(memberID) {
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
    var chatRoomExists = false;
    var existingChatRoomData = {};

    for ( var i = 0; i < chatRooms.length; i++ ) {
      var singleChatRoom = chatRooms[i];

      if (
        ( singleChatRoom.data.chatType === 'private' && userID === memberID ) ||
        ( singleChatRoom.data.chatType === 'direct' && singleChatRoom.data.members.some(member => member._id === memberID) )
      ) {
        chatRoomExists = true;
        existingChatRoomData = singleChatRoom;
        break;
      }
    }

    if ( !chatRoomExists ) {
      createDirectChatRoom(userID, memberID, activeChatRoom.data._id);
    } else if ( Object.keys(existingChatRoomData).length > 0 && existingChatRoomData.constructor === Object ) {
      changeChatRoom(existingChatRoomData, userID, activeChatRoom.data._id);
      handleRightSideDrawerToggleEvent();
      this.setState({
        searchFilter: '',
        selectedMemberIndex: -1
      });
    } else {
      handleRightSideDrawerToggleEvent();
      this.setState({
        searchFilter: '',
        selectedMemberIndex: -1
      });
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
