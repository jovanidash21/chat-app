import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {
  Form,
  Button
} from 'muicss/react';
import Toggle from 'react-toggle';
import { createChatRoom } from '../../actions/chat-room';
import ChatRoomNameInput from '../../components/CreateChatRoomModal/ChatRoomNameInput';
import ChatMember from '../../components/CreateChatRoomModal/ChatMember';
import ChatMemberSelect from '../../components/CreateChatRoomModal/ChatMemberSelect';
import 'react-toggle/style.css';

class CreateChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRoomName: '',
      members: [this.props.user.userData],
      isPrivate: false
    }
  }
  onChatRoomNameChange(event) {
    event.preventDefault();

    this.setState({chatRoomName: event.target.value});
  }
  onSuggestionSelected(event, suggestion) {
    const { members } = this.state;
    const selectedMember = suggestion.suggestion;

    if (members.some((memberData) => memberData._id === selectedMember._id)) {
      this.setState({
        members: [
          ...members.filter((memberData) => memberData._id !== selectedMember._id)
        ]
      });
    } else {
      this.setState({
        members: [
          ...members.filter((memberData) => memberData._id !== selectedMember._id),
          selectedMember
        ]
      });
    }
  }
  handleDeselectMember(member) {
    const { members } = this.state;

    this.setState({
      members: [
        ...members.filter((memberData) => memberData._id !== member._id)
      ]
    });
  }
  onIsPrivateChange(event) {
    this.setState({isPrivate: event.target.isPrivate});
  }
  handleAddChatRoom(event) {
    event.preventDefault();

    const {
      user,
      createChatRoom,
      handleDeactivateModal
    } = this.props;
    const {
      chatRoomName,
      members,
      isPrivate
    } = this.state;
    let data = {
      name: chatRoomName,
      members: members,
      private: isPrivate,
      userID: user.userData._id
    }

    createChatRoom(data);
    handleDeactivateModal();
  }
  render() {
    const {
      user,
      handleDeactivateModal,
      isLoading
    } = this.props;
    const {
      members,
      isPrivate
    } = this.state;

    return (
     <ModalContainer onClose={handleDeactivateModal}>
        <ModalDialog
          className="add-chat-room-modal"
          style={{width: '300px'}}
          onClose={handleDeactivateModal}
        >
          <Form onSubmit={::this.handleAddChatRoom}>
            <h2 className="modal-title">Add Chat Room</h2>
            <ChatRoomNameInput  onChatRoomNameChange={::this.onChatRoomNameChange} />
            <div className="members-list">
              {
                members.map((memberData, i) =>
                  <ChatMember
                    key={i}
                    index={i}
                    memberData={memberData}
                    handleDeselectMember={::this.handleDeselectMember}
                  />
                )
              }
            </div>
            <ChatMemberSelect
              userData={user.userData}
              users={user.users}
              onSuggestionSelected={::this.onSuggestionSelected}
            />
            <div className="modal-toggle">
              <label>
                <Toggle
                  defaultChecked={isPrivate}
                  onChange={::this.onIsPrivateChange}
                />
                <span>Private</span>
              </label>
            </div>
            <Button
              className="modal-button"
              size="large"
              type="submit"
              variant="raised"
              disabled={isLoading}
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
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createChatRoom
  }, dispatch);
}

CreateChatRoomModal.propTypes = {
  handleDeactivateModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

CreateChatRoomModal.defaultProps = {
  isLoading: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChatRoomModal);
