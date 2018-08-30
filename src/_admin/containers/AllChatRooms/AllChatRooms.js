import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import {
  Table,
  DeleteChatRoomModal
} from '../Partial';
import { MenuButton } from '../../components/MenuButton';
import { Avatar } from '../../../components/Avatar';

class AllChatRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isModalOpen: false,
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'members', label: 'Members' },
        { key: 'chatType', label: 'Chat Type' }
      ],
      rows: []
    };
  }
  componentWillMount() {
    const { fetchChatRooms } = this.props;

    fetchChatRooms();
  }
  componentDidUpdate(prevProps) {
    if (
      ( prevProps.chatRoom.isFetchingAll && !this.props.chatRoom.isFetchingAll ) ||
      ( prevProps.chatRoom.isDeleting && !this.props.chatRoom.isDeleting )
    ) {
      ::this.handleChatRoomRows();
    }
  }
  handleAccountType(chatRoomData) {
    var accountType = '';

    switch ( chatRoomData.chatType ) {
      case 'private':
        if ( chatRoomData.members.length > 0 ) {
          accountType = chatRoomData.members[0].accountType;
        }
        break;
      default:
        break;
    }

    return accountType;
  }
  handleChatRoomRows() {
    const { chatRoom } = this.props;
    const chatRoomRows = [];

    for ( var i = 0; i < chatRoom.all.length; i++ ) {
      const singleChatRoom = chatRoom.all[i];
      const image = (<Avatar
          image={singleChatRoom.chatIcon}
          size="32px"
          title={singleChatRoom.name}
          accountType={::this.handleAccountType(singleChatRoom)}
          badgeCloser
        />);

      chatRoomRows.push({
        _id: singleChatRoom._id,
        image: image,
        name: singleChatRoom.name,
        members: singleChatRoom.members.length,
        chatType: singleChatRoom.chatType,
        isEditable: singleChatRoom.chatType === 'group'
      });
    }

    this.setState({
      isLoading: false,
      rows: chatRoomRows
    });
  }
  handleOpenModal(selecedtChatRoomID) {
    const { fetchSelectedChatRoom } = this.props;

    this.setState({isModalOpen: true});

    fetchSelectedChatRoom(selecedtChatRoomID);
  }
  handleCloseModal() {
    this.setState({isModalOpen: false});
  }
  render() {
    const {
      isLoading,
      columns,
      rows,
      isModalOpen
    } = this.state;
    const label = {
      singular: 'chat room',
      plural: 'chat rooms'
    };
    const modal = (<DeleteChatRoomModal
        isModalOpen={isModalOpen}
        handleCloseModal={::this.handleCloseModal}
      />);

    return (
      <div className="all-chat-rooms-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              <div className="admin-menu-section">
                <MenuButton label="Create New" link="/create-chat-room" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Table
                label={label}
                columns={columns}
                rows={rows}
                isLoading={isLoading}
                editLink="/edit-chat-room"
                deleteModal={modal}
                isDeleteModalOpen={isModalOpen}
                handleOpenDeleteModal={::this.handleOpenModal}
                handleCloseDeleteModal={::this.handleCloseModal}
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
    chatRoom: state.chatRoom
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChatRooms);
