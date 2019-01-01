import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { SearchFilter } from '../../../../components/SearchFilter';
import { ChatRoom } from '../../../components/LeftSideDrawer';
import { CreateChatRoomModal } from '../CreateChatRoomModal';
import './styles.scss';

class ChatRoomsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChatBoxRoomsListScrolled: false,
      isModalOpen: false,
      chatRooms: [],
      searchFilter: '',
      selectedChatRoomIndex: -1
    }
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.fetch.loading && !this.props.chatRoom.fetch.loading ) {
      const {
        user,
        chatRoom,
        changeChatRoom
      } = this.props;
      const allChatRooms = chatRoom.all.sort((a, b) => {
        var n = a.priority - b.priority;

        if (n !== 0) {
          return n;
        }

        return a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
      });

      this.chatRoomsList.addEventListener('scroll', ::this.handleChatRoomsListScroll, true);

      changeChatRoom(allChatRooms[0], user.active._id, '');

      ::this.handleChatRoomsListFilter();
    }

    if ( prevProps.chatRoom.all.length !== this.props.chatRoom.all.length ) {
      ::this.handleChatRoomsListFilter(this.state.searchFilter);
    }
  }
  handleChatRoomsListScroll() {
    if ( this.chatRoomsList.scrollTop > 10 ) {
      this.setState({isChatBoxRoomsListScrolled: true});
    } else {
      this.setState({isChatBoxRoomsListScrolled: false});
    }
  }
  handleChatRoomsListFilter(searchFilter='') {
    const { chatRoom } = this.props;
    const { selectedChatRoomIndex } = this.state;
    var allChatRooms = [...chatRoom.all];
    var chatRoomIndex = selectedChatRoomIndex;

    if ( searchFilter.length > 0 ) {
      allChatRooms = allChatRooms.filter((singleChatRoom) => {
        return singleChatRoom.data.name.toLowerCase().match(searchFilter.toLowerCase());
      });

      if ( selectedChatRoomIndex === -1 ) {
        chatRoomIndex = 0;
      }
    } else {
      allChatRooms = [...chatRoom.all];
      chatRoomIndex = -1;
    }

    this.setState({
      chatRooms: allChatRooms,
      selectedChatRoomIndex: chatRoomIndex
    });
  }
  handleClearSearchFilter() {
    this.setState({searchFilter: ''});
    ::this.handleChatRoomsListFilter();
  }
  handleChatRoomsListRender() {
    const {
      user,
      chatRoom,
      changeChatRoom,
      handleLeftSideDrawerToggleEvent,
      handleOpenPopUpChatRoom
    } = this.props;
    const {
      isChatBoxRoomsListScrolled,
      chatRooms,
      searchFilter,
      selectedChatRoomIndex
    } = this.state;

    if ( !chatRoom.fetch.loading && chatRoom.fetch.success ) {
      const activeChatRoom = chatRoom.active;

      return (
        <div className="chat-rooms-list-wrapper">
          <div className="chat-rooms-options">
            <div className="door-icon">
              <FontAwesomeIcon icon="door-closed" size="2x" />
            </div>
            <h3>Chat Rooms</h3>
            <div className="plus-icon"
              onClick={::this.handleOpenModal}
              title="Create Chat Room"
            >
              <FontAwesomeIcon icon="plus" />
            </div>
          </div>
          <SearchFilter
            value={searchFilter}
            onChange={::this.onChatRoomNameChange}
            onKeyDown={::this.onChatRoomNameKeyDown}
            handleClearSearchFilter={::this.handleClearSearchFilter}
            light
          />
          <div className={"scroll-shadow " + (isChatBoxRoomsListScrolled ? 'scrolled' : '')} />
          <div
            className="chat-rooms-list"
            ref={(element) => { this.chatRoomsList = element; }}
          >
            {
              chatRooms.length > 0 &&
              chatRooms.sort((a, b) => {
                var priority = a.priority - b.priority;
                var name = a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
                var date = new Date(b.data.createdAt) - new Date(a.data.createdAt);

                if (priority !== 0) {
                  return priority;
                } else if ( name !== 0 ) {
                  return name
                } else {
                  return date;
                }
              }).map((singleChatRoom, i) =>
                <ChatRoom
                  key={i}
                  user={user.active}
                  chatRoom={singleChatRoom}
                  activeChatRoom={activeChatRoom}
                  isActive={(activeChatRoom.data._id === singleChatRoom.data._id) ? true : false}
                  isSelected={selectedChatRoomIndex === i}
                  handleOpenPopUpChatRoom={handleOpenPopUpChatRoom}
                  handleChangeChatRoom={changeChatRoom}
                  handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
                />
              )
            }
            {
              chatRooms.length === 0 &&
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
  handleOpenModal(event) {
    event.preventDefault();

    this.setState({isModalOpen: true});
  }
  handleCloseModal() {
    this.setState({isModalOpen: false});
  }
  onChatRoomNameChange(event) {
    const searchFilter = event.target.value;

    this.setState({searchFilter: searchFilter});

    ::this.handleChatRoomsListFilter(searchFilter);
  }
  onChatRoomNameKeyDown(event) {
    const {
      user,
      chatRoom,
      changeChatRoom
    } = this.props;
    const {
      chatRooms,
      selectedChatRoomIndex
    } = this.state;

    if ( chatRooms.length > 0 ) {
      if ( event.keyCode === 38 ) {
        if ( selectedChatRoomIndex === -1 ) {
          this.setState({selectedChatRoomIndex: chatRooms.length - 1});
        } else {
          this.setState({selectedChatRoomIndex: selectedChatRoomIndex - 1});
        }
      }

      if ( event.keyCode === 40 ) {
        if ( selectedChatRoomIndex === chatRooms.length - 1 ) {
          this.setState({selectedChatRoomIndex: -1});
        } else {
          this.setState({selectedChatRoomIndex: selectedChatRoomIndex + 1});
        }
      }

      if ( event.key === 'Enter' && selectedChatRoomIndex !== -1 ) {
        const selectedChatRoom = chatRooms[selectedChatRoomIndex];

        changeChatRoom(selectedChatRoom, user.active._id, chatRoom.active.data._id);
      }
    }
  }
  render() {
    const {
      user,
      chatRoom,
      handleLeftSideDrawerToggleEvent
    } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div style={{height: '100%'}}>
        {::this.handleChatRoomsListRender()}
        {
          isModalOpen &&
          <CreateChatRoomModal
            isModalOpen={isModalOpen}
            handleCloseModal={::this.handleCloseModal}
            handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

ChatRoomsList.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleOpenPopUpChatRoom: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsList);
