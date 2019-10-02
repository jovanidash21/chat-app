import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../actions';
import { ChatRoomForm } from '../Partial';
import { MenuButton } from '../../components/MenuButton';

class EditChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      successMessage: '',
    };
  }
  componentWillMount() {
    ::this.handleFetchSelectedtChatRoom();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.chatRoom.edit.loading && this.props.chatRoom.edit.loading) {
      this.setState({
        errorMessage: '',
        successMessage: '',
      });
    }

    if (prevProps.chatRoom.edit.loading && !this.props.chatRoom.edit.loading) {
      if (this.props.chatRoom.edit.error) {
        this.setState({
          errorMessage: this.props.chatRoom.edit.message,
          successMessage: '',
        });
      } else if (this.props.chatRoom.edit.success) {
        this.setState({
          errorMessage: '',
          successMessage: this.props.chatRoom.edit.message,
        });
      }
    }
  }
  handleFetchSelectedtChatRoom() {
    const {
      match,
      fetchSelectedChatRoom,
    } = this.props;
    const chatRoomID = match.params.chatRoomID;

    fetchSelectedChatRoom(chatRoomID);
  }
  render() {
    const {
      errorMessage,
      successMessage,
    } = this.state;

    return (
      <div className="create-chat-room-section">
        <ChatRoomForm
          mode="edit"
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
)(EditChatRoom);
