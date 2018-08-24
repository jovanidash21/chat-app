import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { Modal } from '../../../../components/Modal';
import { Avatar } from '../../../../components/Avatar';
import { Alert } from '../../../../components/Alert';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import './styles.scss';

class DeleteChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.isFetchingSelected && !this.props.chatRoom.isFetchingSelected ) {
      this.setState({
        isLoading: false
      });
    }

    if ( prevProps.chatRoom.isDeleting && this.props.chatRoom.isDeletingSuccess ) {
      this.props.handleCloseModal();
    }
  }
  handleDeleteChatRoomFormRender() {
    const {
      chatRoom,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const { isLoading } = this.state;
    const selectedChatRoom = chatRoom.selected;

    if ( !isLoading ) {
      return (
        <Form onSubmit={::this.handleDeleteChatRoom}>
          <Modal.Header>
            <h3 className="modal-title">Delete ChatRoom</h3>
          </Modal.Header>
          <Modal.Body>
            {
              !chatRoom.isDeleting &&
              !chatRoom.isDeletingSuccess &&
              <Alert label="Error! Please try again" />
            }
            <div className="avatar-wrapper">
              <Avatar
                image={selectedChatRoom.profilePicture}
                size="100px"
                title={selectedChatRoom.name}
                accountType={selectedChatRoom.accountType}
                badgeBigger
                badgeCloser
              />
            </div>
            <p>
              <span className="chatRoom-name mui--text-danger">{selectedChatRoom.name}</span>&nbsp;
              will be deleted. This will permanently delete all of messages on the chat room.
            </p>
            <p>This action cannot be undone. Are you sure you want to delete this chat room?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={chatRoom.isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={chatRoom.isDeleting}
            >
              Yes, Delete ChatRoom
            </Button>
          </Modal.Footer>
        </Form>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  handleDeleteChatRoom(event) {
    event.preventDefault();

    const {
      chatRoom,
      deleteChatRoom
    } = this.props;
    const selectedChatRoom = chatRoom.selected;

    deleteChatRoom(selectedChatRoom._id);
  }
  render() {
    const {
      isModalOpen,
      handleCloseModal
    } = this.props;

    return (
      <Modal
        className="delete-chatRoom-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      >
        {::this.handleDeleteChatRoomFormRender()}
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom
  }
}

DeleteChatRoomModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired
}

DeleteChatRoomModal.defaultProps = {
  isModalOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteChatRoomModal);
