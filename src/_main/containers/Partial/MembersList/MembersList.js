import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { formatNumber } from '../../../../utils/number';
import { BlockUnblockUserModal } from '../BlockUnblockUserModal';
import { SearchFilter } from '../../../../components/SearchFilter';
import { Skeleton } from '../../../../components/Skeleton';
import { ChatRoomMember } from '../../../components/RightSideDrawer';
import { SOCKET_BROADCAST_EDIT_ACTIVE_USER } from '../../../constants/user';
import socket from '../../../../socket';
import './styles.scss';

class MembersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      membersListScrolled: false,
      members: [],
      searchFilter: '',
      selectedMemberIndex: -1,
      blockUnblockUserModalOpen: false,
      selectedUser: {},
    }
  }
  componentDidMount() {
    socket.on('action', (action) => {
      switch (action.type) {
        case SOCKET_BROADCAST_EDIT_ACTIVE_USER:
          ::this.handleMembersListFilter(this.state.searchFilter);
          break;
      }
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.member.fetch.loading && !this.props.member.fetch.loading) {
      this.membersList.addEventListener('scroll', ::this.handleMembersListScroll, true);

      ::this.handleMembersListFilter();
    }

     if (
      (prevProps.member.all.length !== this.props.member.all.length) ||
      (prevProps.user.editActive.loading && !this.props.user.editActive.loading)
    ) {
      ::this.handleMembersListFilter(this.state.searchFilter);
    }

    if (prevProps.chatRoom.create.loading && this.props.chatRoom.create.success) {
      const { handleRightSideDrawerToggleEvent } = this.props;

      handleRightSideDrawerToggleEvent();
      this.setState({
        searchFilter: '',
        selectedMemberIndex: -1,
      });
    }
  }
  handleMembersListScroll() {
    if (this.membersList.scrollTop > 10) {
      this.setState({membersListScrolled: true});
    } else {
      this.setState({membersListScrolled: false});
    }
  }
  handleMembersListFilter(searchFilter = '') {
    const { member } = this.props;
    const { selectedMemberIndex } = this.state;
    let allMembers = [...member.all];
    let memberIndex = selectedMemberIndex;

    if (searchFilter.length > 0) {
      allMembers = allMembers.filter((singleMember) => {
        return singleMember.name && singleMember.name.toLowerCase().match(searchFilter.toLowerCase());
      });

      if (selectedMemberIndex === -1) {
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
  onSearchFilterChange(event) {
    const searchFilter = event.target.value;

    this.setState({searchFilter: searchFilter});

    ::this.handleMembersListFilter(searchFilter);
  }
  onMemberNameKeyDown(event, mobile) {
    const {
      members,
      selectedMemberIndex,
    } = this.state;

    if (members.length > 0) {
      if (event.key === 'ArrowUp') {
        if (selectedMemberIndex === -1) {
          this.setState({selectedMemberIndex: members.length - 1});
        } else {
          this.setState({selectedMemberIndex: selectedMemberIndex - 1});
        }
      }

      if (event.key === 'ArrowDown') {
        if (selectedMemberIndex === members.length - 1) {
          this.setState({selectedMemberIndex: -1});
        } else {
          this.setState({selectedMemberIndex: selectedMemberIndex + 1});
        }
      }

      if (event.key === 'Enter' && selectedMemberIndex !== -1) {
        const selectedMember = members[selectedMemberIndex];

        ::this.handleAddDirectChatRoom(selectedMember._id, mobile);
      }
    }
  }
  handleAddDirectChatRoom(memberID, mobile) {
    const {
      user,
      chatRoom,
      createDirectChatRoom,
      changeChatRoom,
      handleRightSideDrawerToggleEvent,
      handleOpenPopUpChatRoom
    } = this.props;
    const userID = user.active._id;
    const chatRooms = chatRoom.all;
    const activeChatRoom = chatRoom.active;

    const chatRoomIndex = chatRooms.findIndex(( singleChatRoom ) => {
      return (
        (singleChatRoom.data.chatType === 'private' && userID === memberID) ||
        (singleChatRoom.data.chatType === 'direct' && singleChatRoom.data.members.some(member => member._id === memberID))
      );
    });

    if (chatRoomIndex === -1) {
      createDirectChatRoom(userID, memberID, activeChatRoom.data._id, !mobile)
        .then((chatRoom) => {
          if ( ! mobile ) {
            handleOpenPopUpChatRoom(chatRoom);
          }
        });
    } else {
      if (mobile) {
        changeChatRoom(chatRooms[chatRoomIndex], userID, activeChatRoom.data._id);
      } else {
        handleOpenPopUpChatRoom(chatRooms[chatRoomIndex]);
      }

      handleRightSideDrawerToggleEvent();
      ::this.handleClearSearchFilter();
    }
  }
  handleOpenBlockUnblockUserModal(selectedUser) {
    this.setState({
      blockUnblockUserModalOpen: true,
      selectedUser,
    });
  }
  handleCloseBlockUnblockUserModal() {
    this.setState({
      blockUnblockUserModalOpen: false,
      selectedUser: {},
    });
  }
  render() {
    const {
      user,
      chatRoom,
      member,
    } = this.props;
    const {
      membersListScrolled,
      members,
      searchFilter,
      selectedMemberIndex,
      blockUnblockUserModalOpen,
      selectedUser,
    } = this.state;
    const loading = user.fetchActive.loading || chatRoom.fetch.loading || member.fetch.loading;

    return (
      <div style={{height: '100%'}}>
        <div className="members-list-wrapper">
          <div className="members-count">
            {
              loading
                ?
                <Fragment>
                  <Skeleton
                    className="user-icon"
                    height="30px"
                    width="25px"
                  />
                  <Skeleton
                    height="28px"
                    width="110px"
                  />
                </Fragment>
                :
                <Fragment>
                  <div className="user-icon">
                    <FontAwesomeIcon icon={["far", "user"]} size="2x" />
                  </div>
                  <h3>
                    {formatNumber(member.all.length)}&nbsp;
                    {member.all.length > 1 ? 'Members' : 'Member'}
                  </h3>
                </Fragment>
            }
          </div>
          <MediaQuery query="(max-width: 767px)">
            {(matches) => {
              return (
                <Fragment>
                  {
                    loading
                      ?
                      <div className="search-filter">
                        <Skeleton
                          height="37px"
                          width="auto"
                        />
                      </div>
                      :
                      <SearchFilter
                        value={searchFilter}
                        onChange={::this.onSearchFilterChange}
                        onKeyDown={(e) => {::this.onMemberNameKeyDown(e, matches)}}
                        handleClearSearchFilter={::this.handleClearSearchFilter}
                        light
                      />
                  }
                </Fragment>
              )
            }}
          </MediaQuery>
          <div className={"scroll-shadow " + (membersListScrolled ? 'scrolled' : '')} />
          <div
            className="members-list"
            ref={(element) => { this.membersList = element; }}
          >
            {
              loading &&
              <Fragment>
                {
                  Array.from(Array(2).keys()).map((i) =>
                    <div
                      key={i}
                      className="chat-room-member"
                    >
                      <Skeleton
                        className="online-indicator"
                        height="10px"
                        width="10px"
                        circle
                      />
                      <Skeleton
                        className="avatar"
                        height="23px"
                        width="23px"
                        circle
                      />
                      <Skeleton
                        height="20px"
                        width="80px"
                      />
                    </div>
                  )
                }
              </Fragment>
            }
            {
              !loading &&
              members.length > 0 &&
              members.sort((a, b) => {
                a.name = a.name || '';
                b.name = b.name || '';

                const name = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                const date = new Date(b.createdAt) - new Date(a.createdAt);

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
                  handleOpenBlockUnblockUserModal={::this.handleOpenBlockUnblockUserModal}
                  active={selectedMemberIndex === i}
                  dropdownUp={(members.length > 10) && (i >= (members.length - 5))}
                />
              )
            }
            {
              !loading &&
              members.length === 0 &&
              <div className="no-results">
                No results found
              </div>
            }
          </div>
        </div>
        {
          blockUnblockUserModalOpen &&
          <BlockUnblockUserModal
            open={blockUnblockUserModalOpen}
            selectedUser={selectedUser}
            onClose={::this.handleCloseBlockUnblockUserModal}
          />
        }
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
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleOpenPopUpChatRoom: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList);
