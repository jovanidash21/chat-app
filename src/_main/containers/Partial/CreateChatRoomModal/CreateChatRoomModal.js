import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { Modal } from '../../../../components/Modal';
import { Alert } from '../../../../components/Alert';
import {
  Input,
  UserSelect
} from '../../../../components/Form';
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
    if (prevProps.chatRoom.create.loading && this.props.chatRoom.create.success) {
      const {
        onClose,
        handleLeftSideDrawerToggleEvent
      } = this.props;

      onClose();
      handleLeftSideDrawerToggleEvent();
    }
  }
  onInputChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  onSuggestionSelected(event, suggestion) {
    event.preventDefault();

    const { user } = this.props;
    const { members } = this.state;
    const selectedMember = suggestion.suggestion;

    if (selectedMember._id !== user.active._id) {
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
  }
  handleDeselectMember(member) {
    const { user } = this.props;
    const { members } = this.state;

    if (member._id !== user.active._id) {
      this.setState({
        members: [
          ...members.filter((singleMember) => singleMember._id !== member._id)
        ]
      });
    }
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

    if (chatRoomName.length > 0 && members.length > 2) {
      createGroupChatRoom(chatRoomName, members, user.active._id, activeChatRoom.data._id);
    }
  }
  render() {
    const {
      user,
      chatRoom,
      searchUser,
      open,
      onClose,
    } = this.props;
    const {
      chatRoomName,
      members,
    } = this.state;
    const searchedUsers = user.searched.filter((singleUser) => {
      return !members.some((singleMember) => singleMember._id === singleUser._id);
    });
    const isSubmitButtonDisabled =
      chatRoomName.length === 0 ||
      members.length < 3 ||
      chatRoom.create.loading;

    return (
      <Modal
        className="create-chat-room-modal"
        open={open}
        onClose={onClose}
      >
        <Form onSubmit={::this.handleAddGroupChatRoom}>
          <Modal.Header>
            <h3 className="modal-title">Create Chat Room</h3>
          </Modal.Header>
          <Modal.Body>
            {
              chatRoom.create.error &&
              <Alert label={chatRoom.create.message} />
            }
            <Input
              value={chatRoomName}
              label="Chat Room Name"
              name="chatRoomName"
              onChange={::this.onInputChange}
              disabled={chatRoom.create.loading}
            />
            <UserSelect
              label="Select at least 3 members"
              placeholder="Select a member"
              handleSearchUser={searchUser}
              selectedUsers={members}
              searchedUsers={searchedUsers}
              onSuggestionSelected={::this.onSuggestionSelected}
              handleDeselectUser={::this.handleDeselectMember}
              listDisabled={chatRoom.create.loading}
              inputDisabled={chatRoom.create.loading}
              loading={user.search.loading}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={onClose}
              disabled={chatRoom.create.loading}
            >
              Cancel
            </Button>
            <Button
              className="button button-primary"
              type="submit"
              disabled={isSubmitButtonDisabled}
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
  }
}

CreateChatRoomModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
}

CreateChatRoomModal.defaultProps = {
  open: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateChatRoomModal);
