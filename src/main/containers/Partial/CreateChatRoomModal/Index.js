import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import ChatRoomNameInput from '../../../components/CreateChatRoomModal/ChatRoomNameInput';
import ChatMember from '../../../components/CreateChatRoomModal/ChatMember';
import ChatMemberSelect from '../../../components/CreateChatRoomModal/ChatMemberSelect';
import ErrorCard from '../../../components/AuthForm/Card/ErrorCard';
import './styles.scss';

class CreateChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRoomName: '',
      members: [this.props.user.active]
    }
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.isCreating && this.props.chatRoom.isCreatingSuccess ) {
      const {
        handleDeactivateModal,
        handleLeftSideDrawerToggleEvent
      } = this.props;

      handleDeactivateModal();
      handleLeftSideDrawerToggleEvent();
    }
  }
  onChatRoomNameChange(event) {
    event.preventDefault();

    this.setState({chatRoomName: event.target.value});
  }
  onSuggestionSelected(event, suggestion) {
    event.preventDefault();

    const { members } = this.state;
    const selectedMember = suggestion.suggestion;

    if (members.some((singleMember) => singleMember._id === selectedMember._id)) {
      this.setState({
        members: [
          ...members.filter((singleMember) => singleMember._id !== selectedMember._id)
        ]
      });
    } else {
      this.setState({
        members: [
          ...members.filter((singleMember) => singleMember._id !== selectedMember._id),
          selectedMember
        ]
      });
    }
  }
  handleDeselectMember(member) {
    const { members } = this.state;

    this.setState({
      members: [
        ...members.filter((singleMember) => singleMember._id !== member._id)
      ]
    });
  }
  handleAddGroupChatRoom(event) {
    event.preventDefault();

    const {
      user,
      chatRoom,
      createGroupChatRoom
    } = this.props;
    const {
      chatRoomName,
      members
    } = this.state;
    const activeChatRoom = chatRoom.active;

    if ( chatRoomName.length > 0 && members.length > 2 ) {
      createGroupChatRoom(chatRoomName, members, user.active._id, activeChatRoom.data._id);
    }
  }
  render() {
    const {
      user,
      chatRoom,
      handleDeactivateModal,
      isLoading
    } = this.props;
    const {
      chatRoomName,
      members
    } = this.state;
    const isButtonDisabled =
      chatRoomName.length === 0 ||
      members.length < 3 ||
      isLoading;

    return (
     <ModalContainer onClose={handleDeactivateModal}>
        <ModalDialog
          className="add-chat-room-modal"
          style={{width: '300px'}}
          onClose={handleDeactivateModal}
        >
          {
            !chatRoom.isCreating &&
            !chatRoom.isCreatingSuccess &&
            <ErrorCard label="Error! Please try again" />
          }
          <Form onSubmit={::this.handleAddGroupChatRoom}>
            <h2 className="modal-title">Add Chat Room</h2>
            <ChatRoomNameInput
              onChatRoomNameChange={::this.onChatRoomNameChange}
              isDisabled={isLoading}
            />
            <div className="members-list-label">
              Select at least 3 members
            </div>
            <div className="members-list" disabled={isLoading}>
              {
                members.map((member, i) =>
                  <ChatMember
                    key={i}
                    index={i}
                    member={member}
                    handleDeselectMember={::this.handleDeselectMember}
                  />
                )
              }
            </div>
            <ChatMemberSelect
              user={user.active}
              users={user.all}
              onSuggestionSelected={::this.onSuggestionSelected}
              isDisabled={isLoading}
            />
            <Button
              className="modal-button"
              size="large"
              type="submit"
              variant="raised"
              disabled={isButtonDisabled}
            >
              Add
            </Button>
          </Form>
        </ModalDialog>
      </ModalContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

CreateChatRoomModal.propTypes = {
  handleDeactivateModal: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

CreateChatRoomModal.defaultProps = {
  isLoading: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChatRoomModal);
