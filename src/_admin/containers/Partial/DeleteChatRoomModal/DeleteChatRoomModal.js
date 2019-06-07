import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button,
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { handleChatRoomAvatarBadges } from '../../../../utils/avatar';
import { Modal } from '../../../../components/Modal';
import { Avatar } from '../../../../components/Avatar';
import { Alert } from '../../../../components/Alert';
import { Skeleton } from '../../../../components/Skeleton';
import './styles.scss';

class DeleteChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.fetchSelect.loading && !this.props.chatRoom.fetchSelect.loading ) {
      this.setState({
        loading: false,
      });
    }

    if ( prevProps.chatRoom.delete.loading && this.props.chatRoom.delete.success ) {
      this.props.onClose();
    }
  }
  handleDeleteChatRoom(event) {
    event.preventDefault();

    const {
      chatRoom,
      deleteChatRoom,
    } = this.props;
    const selectedChatRoom = chatRoom.selected;

    deleteChatRoom(selectedChatRoom._id);
  }
  render() {
    const {
      chatRoom,
      open,
      onClose,
    } = this.props;
    const { loading } = this.state;
    const selectedChatRoom = chatRoom.selected;

    return (
      <Modal
        className="delete-chat-room-modal"
        open={open}
        onClose={onClose}
        danger
      >
        <Form onSubmit={::this.handleDeleteChatRoom}>
          <Modal.Header>
            <h3 className="modal-title">Delete ChatRoom</h3>
          </Modal.Header>
          <Modal.Body>
            {
              chatRoom.delete.error &&
              <Alert label={chatRoom.delete.message} />
            }
            <div className="avatar-wrapper">
              {
                loading
                  ?
                  <Skeleton
                    className="avatar"
                    height="100px"
                    width="100px"
                    circle
                  />
                  :
                  <Avatar
                    image={selectedChatRoom.chatIcon}
                    size="100px"
                    name={selectedChatRoom.name}
                    roleChatType={handleChatRoomAvatarBadges(selectedChatRoom, {}, 'role-chat')}
                    accountType={handleChatRoomAvatarBadges(selectedChatRoom)}
                    badgeBigger
                    badgeCloser
                  />
              }
            </div>
            {
              loading
                ?
                <Fragment>
                  {
                    Array.from(Array(2).keys()).map((i) =>
                      <div key={i} style={{marginBottom: '0.625rem'}}>
                        <Skeleton
                          height="20px"
                          width={(i === 0 ? '100%' : '75%')}
                        />
                      </div>
                    )
                  }
                </Fragment>
                :
                <Fragment>
                  <p>
                    <span className="chatRoom-name mui--text-danger">{selectedChatRoom.name}</span>&nbsp;
                    will be deleted. This will permanently delete all of messages on the chat room.
                  </p>
                  <p>This action cannot be undone. Are you sure you want to delete this chat room?</p>
                </Fragment>
            }
          </Modal.Body>
          <Modal.Footer>
            {
              loading
                ?
                <Fragment>
                  {
                    Array.from(Array(2).keys()).map((i) =>
                      <Skeleton
                        key={i}
                        className="mui-btn"
                        height="36px"
                        width="110px"
                      />
                    )
                  }
                </Fragment>
                :
                <Fragment>
                  <Button
                    className="button button-default"
                    onClick={onClose}
                    disabled={chatRoom.delete.loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="button button-danger"
                    type="submit"
                    disabled={chatRoom.delete.loading}
                  >
                    Yes, Delete ChatRoom
                  </Button>
                </Fragment>
            }
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom,
  }
}

DeleteChatRoomModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

DeleteChatRoomModal.defaultProps = {
  open: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteChatRoomModal);
