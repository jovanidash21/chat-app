import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import FontAwesome from 'react-fontawesome';
import mapDispatchToProps from '../../actions';
import LoadingAnimation from '../../components/LoadingAnimation';
import ChatRoomMember from '../../components/RightSideDrawer/ChatRoomMember';
import '../../styles/RightSideDrawer.scss';

class RightSideDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }
  handleComponent() {
    const {
      chatRoom,
      activeChatRoom,
    } = this.props;

    if (!chatRoom.isLoading && chatRoom.isFetchChatRoomsSuccess) {
      const activeChatRoomData = activeChatRoom.chatRoomData;

      return (
        <div className="right-side-drawer">
          <div className="members-count">
            <div className="user-icon">
              <FontAwesome
                name="user"
                size="2x"
              />
            </div>
            <h2>
              {activeChatRoomData.members.length}&nbsp;
              {activeChatRoomData.members.length > 1 ? 'Members' : 'Member'}
            </h2>
          </div>
          <div className="member-list">
            {
              activeChatRoomData.members.length > 0 &&
              activeChatRoomData.members.map((chatRoomMember, i) =>
                <ChatRoomMember
                  key={i}
                  chatRoomMember={chatRoomMember}
                />
              )
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
  render() {
    const {
      isRightSideDrawerOpen,
      handleRightSideDrawerToggleState
    } = this.props;
    const { showModal } = this.state;

    return (
      <Menu
        width="250px"
        isOpen={isRightSideDrawerOpen}
        onStateChange={handleRightSideDrawerToggleState}
        right
      >
        {::this.handleComponent()}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom,
    activeChatRoom: state.activeChatRoom
  }
}

RightSideDrawer.propTypes = {
  handleRightSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleRightSideDrawerToggleState: PropTypes.func.isRequired,
  isRightSideDrawerOpen: PropTypes.bool
}

RightSideDrawer.defaultProps = {
  isRightSideDrawerOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSideDrawer);
