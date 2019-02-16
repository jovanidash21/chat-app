import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { ChatRoomForm } from '../Partial';
import { MenuButton } from '../../components/MenuButton';
import { Alert } from '../../../components/Alert';

class EditChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    ::this.handleFetchSelectedtChatRoom();
  }
  handleFetchSelectedtChatRoom() {
    const {
      match,
      fetchSelectedChatRoom
    } = this.props;
    const chatRoomID = match.params.chatRoomID;

    fetchSelectedChatRoom(chatRoomID);
  }
  render() {
    const { chatRoom } = this.props;

    return (
      <div className="create-chat-room-section">
        <Container fluid>
          <Row>
            <Col xs="12">
              <div className="admin-menu-section">
                <MenuButton label="Create New" link="/create-chat-room" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              {
                ( chatRoom.edit.success || chatRoom.edit.error ) &&
                <Alert label={chatRoom.edit.message} type={(chatRoom.edit.success ? 'success' : 'error')} />
              }
            </Col>
          </Row>
          <ChatRoomForm mode="edit" />
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
)(EditChatRoom);
