import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../actions';
import { ChatRoomForm } from '../Partial';

class CreateChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      successMessage: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.chatRoom.create.loading && this.props.chatRoom.create.loading) {
      this.setState({
        errorMessage: '',
        successMessage: '',
      });
    }

    if (prevProps.chatRoom.create.loading && ! this.props.chatRoom.create.loading) {
      if (this.props.chatRoom.create.error) {
        this.setState({
          errorMessage: this.props.chatRoom.create.message,
          successMessage: '',
        });
      } else if ( this.props.chatRoom.create.success ) {
        this.setState({
          errorMessage: '',
          successMessage: this.props.chatRoom.create.message,
        });
      }
    }
  }
  render() {
    const {
      errorMessage,
      successMessage,
    } = this.state;

    return (
      <div className="create-chat-room-section">
        <ChatRoomForm
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
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
)(CreateChatRoom);
