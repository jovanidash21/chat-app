import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { ChatRoomForm } from '../Partial';
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
      <div className="create-chatRoom-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              {
                !chatRoom.isEditing &&
                !chatRoom.isEditingSuccess &&
                <Alert label="Sorry! Please try again." />
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
