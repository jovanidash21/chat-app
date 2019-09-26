import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { SearchFilter } from '../../../../components/SearchFilter';
import { Skeleton } from '../../../../components/Skeleton';
import { ChatRoom } from '../../../components/LeftSideDrawer';
import { CreateChatRoomModal } from '../CreateChatRoomModal';
import './styles.scss';

class ChatRoomsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatBoxRoomsListScrolled: false,
      createChatRoomModalOpen: false,
      chatRooms: [],
      searchFilter: '',
      selectedChatRoomIndex: -1,
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.chatRoom.fetch.loading && !this.props.chatRoom.fetch.loading) {
      const {
        user,
        chatRoom,
        changeChatRoom,
      } = this.props;
      const allChatRooms = chatRoom.all.sort((a, b) => {
        a.data.name = a.data.name || '';
        b.data.name = b.data.name || '';

        const n = a.priority - b.priority;

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
    if (this.chatRoomsList.scrollTop > 10) {
      this.setState({chatBoxRoomsListScrolled: true});
    } else {
      this.setState({chatBoxRoomsListScrolled: false});
    }
  }
  handleChatRoomsListFilter(searchFilter = '') {
    const { chatRoom } = this.props;
    const { selectedChatRoomIndex } = this.state;
    let allChatRooms = [...chatRoom.all];
    let chatRoomIndex = selectedChatRoomIndex;

    if (searchFilter.length > 0) {
      allChatRooms = allChatRooms.filter((singleChatRoom) => {
        return singleChatRoom.data.name && singleChatRoom.data.name.toLowerCase().match(searchFilter.toLowerCase());
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
  handleOpenCreateChatRoomModal(event) {
    event.preventDefault();

    this.setState({createChatRoomModalOpen: true});
  }
  handleCloseCreateChatRoomModal() {
    this.setState({createChatRoomModalOpen: false});
  }
  onSearchFilterChange(event) {
    const searchFilter = event.target.value;

    this.setState({searchFilter: searchFilter});

    ::this.handleChatRoomsListFilter(searchFilter);
  }
  onChatRoomNameKeyDown(event, mobile) {
    const {
      user,
      chatRoom,
      changeChatRoom,
      handleLeftSideDrawerToggleEvent,
      handleOpenPopUpChatRoom,
    } = this.props;
    const {
      chatRooms,
      selectedChatRoomIndex
    } = this.state;

    if (chatRooms.length > 0) {
      if (event.key === 'ArrowUp') {
        if ( selectedChatRoomIndex === -1 ) {
          this.setState({selectedChatRoomIndex: chatRooms.length - 1});
        } else {
          this.setState({selectedChatRoomIndex: selectedChatRoomIndex - 1});
        }
      }

      if (event.key === 'ArrowDown') {
        if (selectedChatRoomIndex === chatRooms.length - 1) {
          this.setState({selectedChatRoomIndex: -1});
        } else {
          this.setState({selectedChatRoomIndex: selectedChatRoomIndex + 1});
        }
      }

      if ( event.key === 'Enter' && selectedChatRoomIndex !== -1 ) {
        const selectedChatRoom = chatRooms[selectedChatRoomIndex];

        if (mobile) {
          changeChatRoom(selectedChatRoom, user.active._id, chatRoom.active.data._id);
          handleLeftSideDrawerToggleEvent();
        } else {
          handleOpenPopUpChatRoom(selectedChatRoom);
        }

        ::this.handleClearSearchFilter();
      }
    }
  }
  render() {
    const {
      user,
      chatRoom,
      changeChatRoom,
      handleLeftSideDrawerToggleEvent,
      handleOpenPopUpChatRoom,
    } = this.props;
    const {
      chatBoxRoomsListScrolled,
      createChatRoomModalOpen,
      chatRooms,
      searchFilter,
      selectedChatRoomIndex,
    } = this.state;
    const activeChatRoom = chatRoom.active;
    const loading = user.fetchActive.loading || chatRoom.fetch.loading;

    return (
      <div style={{height: '100%'}}>
        <div className="chat-rooms-list-wrapper">
          <div className="chat-rooms-options">
            {
              loading
                ?
                <Fragment>
                  <Skeleton
                    className="door-icon"
                    height="30px"
                    width="35px"
                  />
                  <Skeleton
                    height="28px"
                    width="110px"
                  />
                </Fragment>
                :
                <Fragment>
                  <div className="door-icon">
                    <FontAwesomeIcon icon="door-closed" size="2x" />
                  </div>
                  <h3>Chat Rooms</h3>
                  <div className="plus-icon"
                    onClick={::this.handleOpenCreateChatRoomModal}
                    title="Create Chat Room"
                  >
                    <FontAwesomeIcon icon="plus" />
                  </div>
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
                        onKeyDown={(e) => {::this.onChatRoomNameKeyDown(e, matches)}}
                        handleClearSearchFilter={::this.handleClearSearchFilter}
                        light
                      />
                  }
                </Fragment>
              )
            }}
          </MediaQuery>
          <div className={"scroll-shadow " + (chatBoxRoomsListScrolled ? 'scrolled' : '')} />
          <div
            className="chat-rooms-list"
            ref={(element) => { this.chatRoomsList = element; }}
          >
            {
              loading &&
              <Fragment>
                {
                  Array.from(Array(2).keys()).map((i) =>
                    <div
                      key={i}
                      className={"chat-room " + (i === 0 ? 'active' : '')}
                    >
                      <Skeleton
                        className="avatar"
                        height="25px"
                        width="25px"
                        circle
                      />
                      <Skeleton
                        height="20px"
                        width={(i === 0 ? '110px' : '80px')}
                      />
                    </div>
                  )
                }
              </Fragment>
            }
            {
              !loading &&
              chatRooms.length > 0 &&
              chatRooms.sort((a, b) => {
                a.data.name = a.data.name || '';
                b.data.name = b.data.name || '';

                const priority = a.priority - b.priority;
                const name = a.data.name.toLowerCase().localeCompare(b.data.name.toLowerCase());
                const date = new Date(b.data.createdAt) - new Date(a.data.createdAt);

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
                  handleOpenPopUpChatRoom={handleOpenPopUpChatRoom}
                  handleChangeChatRoom={changeChatRoom}
                  handleLeftSideDrawerToggleEvent={handleLeftSideDrawerToggleEvent}
                  active={activeChatRoom.data._id === singleChatRoom.data._id}
                  selected={selectedChatRoomIndex === i}
                />
              )
            }
            {
              !loading &&
              chatRooms.length === 0 &&
              <div className="no-results">
                No results found
              </div>
            }
          </div>
        </div>
        {
          createChatRoomModalOpen &&
          <CreateChatRoomModal
            open={createChatRoomModalOpen}
            onClose={::this.handleCloseCreateChatRoomModal}
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
    chatRoom: state.chatRoom,
  }
}

ChatRoomsList.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  handleOpenPopUpChatRoom: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsList);
