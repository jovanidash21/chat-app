import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { handleChatRoomAvatarBadges } from '../../../utils/avatar';
import {
  Table,
  DeleteChatRoomModal,
} from '../Partial';
import { MenuButton } from '../../components/MenuButton';
import { Alert } from '../../../components/Alert';
import { Avatar } from '../../../components/Avatar';

class AllChatRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      deleteModalOpen: false,
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'members', label: 'Members' },
        { key: 'chatType', label: 'Chat Type' }
      ],
      rows: [],
    };
  }
  componentWillMount() {
    const { fetchChatRooms } = this.props;

    fetchChatRooms();
  }
  componentDidUpdate(prevProps) {
    if (
      (prevProps.chatRoom.fetchAll.loading && !this.props.chatRoom.fetchAll.loading) ||
      (prevProps.chatRoom.delete.loading && !this.props.chatRoom.delete.loading)
    ) {
      ::this.handleChatRoomRows();
    }
  }
  handleChatRoomRows() {
    const { chatRoom } = this.props;
    const chatRoomRows = [];

    for (let i = 0; i < chatRoom.all.length; i += 1) {
      const singleChatRoom = chatRoom.all[i];
      const image = (<Avatar
          image={singleChatRoom.chatIcon}
          size="32px"
          name={singleChatRoom.name}
          roleChatType={handleChatRoomAvatarBadges(singleChatRoom, {}, 'role-chat')}
          accountType={handleChatRoomAvatarBadges(singleChatRoom)}
          badgeCloser
        />);

      chatRoomRows.push({
        _id: singleChatRoom._id,
        image: image,
        name: singleChatRoom.name,
        members: singleChatRoom.members.length,
        chatType: singleChatRoom.chatType,
        isEditable: singleChatRoom.chatType === 'group',
      });
    }

    this.setState({
      loading: false,
      rows: chatRoomRows,
    });
  }
  handleOpenDeleteModal(selecedtChatRoomID) {
    const { fetchSelectedChatRoom } = this.props;

    this.setState({deleteModalOpen: true});

    fetchSelectedChatRoom(selecedtChatRoomID);
  }
  handleCloseDeleteModal() {
    this.setState({deleteModalOpen: false});
  }
  render() {
    const { chatRoom } = this.props;
    const {
      loading,
      columns,
      rows,
      deleteModalOpen,
    } = this.state;
    const label = {
      singular: 'chat room',
      plural: 'chat rooms',
    };
    const modal = (<DeleteChatRoomModal
        open={deleteModalOpen}
        onClose={::this.handleCloseDeleteModal}
      />);

    return (
      <div className="all-chat-rooms-section">
        <Container fluid>
          <Row>
            <Col xs="12">
              <div className="admin-menu-section">
                <MenuButton label="Create New" link="/create-chat-room" />
              </div>
            </Col>
            <Col xs="12">
              {
                chatRoom.delete.success &&
                <Alert label={chatRoom.delete.message} type="success" />
              }
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Table
                label={label}
                columns={columns}
                rows={rows}
                loading={loading}
                editLink="/edit-chat-room"
                deleteModal={modal}
                deleteModalOpen={deleteModalOpen}
                handleOpenDeleteModal={::this.handleOpenDeleteModal}
                handleCloseDeleteModal={::this.handleCloseDeleteModal}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllChatRooms);
