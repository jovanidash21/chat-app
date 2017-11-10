import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {
  Form,
  Input,
  Checkbox,
  Button
} from 'muicss/react';
import '../../styles/Modal.scss';

class CreateChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRoomName: '',
      isPrivate: false
    }
  }
  onChatRoomNameChange(event) {
    event.preventDefault();

    this.setState({chatRoomName: event.target.value});
  }
  onIsPrivateChange(event) {
    this.setState({isPrivate: event.target.isPrivate});
  }
  handleAddChatRoom(event) {
    event.preventDefault();

    const {
      handleDeactivateModal,
      handleAddChatRoom,
      userData
    } = this.props;
    const { 
      chatRoomName,
      isPrivate
    } = this.state;
    let data = {
      name: chatRoomName, 
      private: isPrivate,
      userID: userData._id
    }

    handleDeactivateModal();
    handleAddChatRoom(data);
  }
  render() {
    const { 
      handleDeactivateModal,
      isLoading
    } = this.props;
    const { isPrivate } = this.state;

    return (
     <ModalContainer onClose={handleDeactivateModal}>
        <ModalDialog 
          className="add-chat-room-modal"
          style={{width: '300px'}}
          onClose={handleDeactivateModal}
        >
          <Form onSubmit={::this.handleAddChatRoom}>
            <h2 className="modal-title">Add Chat Room</h2>
            <Input
              label="Chat Room Name"
              type="text"
              autoComplete="off"
              floatingLabel={true}
              required={true}
              onChange={::this.onChatRoomNameChange}
            />
            <Checkbox
              label="Private"
              checked={isPrivate}
              onChange={::this.onIsPrivateChange}
            />
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

CreateChatRoomModal.propTypes={
  handleDeactivateModal: PropTypes.func.isRequired,
  handleAddChatRoom: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
}

export default CreateChatRoomModal;