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

class CreateChatRoom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { chatRoom } = this.props;

    return (
      <div className="create-chat-room-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              {
                !chatRoom.isCreating &&
                !chatRoom.isCreatingSuccess &&
                <Alert label="Sorry! Please try again." />
              }
            </Col>
          </Row>
          <ChatRoomForm />
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
)(CreateChatRoom);
