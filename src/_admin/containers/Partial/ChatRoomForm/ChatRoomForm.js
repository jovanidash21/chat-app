import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel,
  Form,
  Select,
  Option,
  Button,
} from 'muicss/react';
import Popup from 'react-popup';
import mapDispatchToProps from '../../../actions';
import { handleChatRoomAvatarBadges } from '../../../../utils/avatar';
import { Alert } from '../../../../components/Alert';
import { Skeleton } from '../../../../components/Skeleton';
import {
  Input,
  UserSelect,
  AvatarUploader,
} from '../../../../components/Form';
import './styles.scss';

class ChatRoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      disabled: false,
      chatType: 'direct',
      name: '',
      members: [],
      chatIcon: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg',
      nameValid: true,
      errorMessage: '',
    };
  }
  componentWillMount() {
    if (this.props.mode === 'create') {
      this.setState({
        loading: false,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.upload.image.loading &&
      !this.props.upload.image.loading &&
      this.props.upload.image.success
    ) {
      this.setState({
        chatIcon: this.props.upload.imageLink
      });
    }

    if ( this.props.mode === 'create' ) {
      if (
        prevProps.chatRoom.create.loading &&
        !this.props.chatRoom.create.loading &&
        this.props.chatRoom.create.success
      ) {
        this.setState({
          chatType: '',
          name: '',
          members: [],
          chatIcon: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg',
        });
      }

      if (
        !prevProps.chatRoom.create.loading &&
        this.props.chatRoom.create.loading
      ) {
        this.setState({disabled: true});
      }

      if (
        prevProps.chatRoom.create.loading &&
        !this.props.chatRoom.create.loading
      ) {
        this.setState({disabled: false});
      }
    }

    if (this.props.mode === 'edit') {
      if (
        prevProps.chatRoom.fetchSelect.loading &&
        !this.props.chatRoom.fetchSelect.loading
      ) {
        ::this.handleDisplayeSelectedChatRoom();
      }

      if (
        !prevProps.chatRoom.edit.loading &&
        this.props.chatRoom.edit.loading
      ) {
        this.setState({disabled: true});
      }

      if (
        prevProps.chatRoom.edit.loading &&
        !this.props.chatRoom.edit.loading
      ) {
        this.setState({disabled: false});
      }
    }
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
    const { user } = this.props;
    const { members } = this.state;

    this.setState({
      members: [
        ...members.filter((singleMember) => singleMember._id !== member._id)
      ]
    });
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
    const { user } = this.props;
    const { members } = this.state;

    this.setState({
      members: [
        ...members.filter((singleMember) => singleMember._id !== member._id)
      ]
    });
  }
  handleDisplayeSelectedChatRoom() {
    const {
      chatRoom,
      mode,
    } = this.props;

    if (mode === 'edit') {
      const selectedChatRoom = chatRoom.selected;

      this.setState({
        loading: false,
        chatType: selectedChatRoom.chatType,
        name: selectedChatRoom.name,
        members: selectedChatRoom.members,
        chatIcon: selectedChatRoom.chatIcon,
      });
    }
  }
  handleChange(event) {
    event.preventDefault();

    this.setState({[event.target.name]: event.target.value});
  }
  handleGeneratePassword(password) {
    this.setState({password: password});
  }
  handleImageUpload(image) {
    const { uploadImage } = this.props;

    if (image.type.indexOf('image/') === -1) {
      Popup.alert('Please select an image file');
    } else if (image.size > 1024 * 1024 * 2) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      uploadImage(image);
    }
  }
  handleRemoveImage() {
    this.setState({chatIcon: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg'});
  }
  handleChatRoomFormValidation(event) {
    event.preventDefault();

    const { mode } = this.props;
    const {
      chatType,
      name,
      members
    } = this.state;
    let nameValid = true;
    let errorMessage = '';

    if (chatType === 'group' && name.trim().length === 0) {
      nameValid = false;
    }

    if (!nameValid) {
      errorMessage = 'Name is required';
    } else if (chatType === 'direct' && members.length !== 2) {
      errorMessage = 'Please select 2 members on Direct Chat Room';
    } else if (chatType === 'group' && members.length < 3) {
      errorMessage = 'Please select at least 3 members';
    }

    this.setState({
      nameValid: nameValid,
      errorMessage: errorMessage
    });

    if (nameValid && errorMessage.length === 0) {
      ::this.handleSubmitChatRoomForm();
    }
  }
  handleSubmitChatRoomForm() {
    const { mode } = this.props;

    switch(mode) {
      case 'create':
        ::this.handleCreateChatRoom();
        break;
      case 'edit':
        ::this.handleEditChatRoom();
        break;
      default:
        break;
    }
  }
  handleCreateChatRoom() {
    const { createChatRoom } = this.props;
    const {
      chatType,
      name,
      members,
      chatIcon,
    } = this.state;

    createChatRoom(
      chatType,
      name,
      members,
      chatIcon,
    );
  }
  handleEditChatRoom() {
    const {
      chatRoom,
      editChatRoom,
    } = this.props;
    const {
      chatType,
      name,
      members,
      chatIcon,
    } = this.state;
    const selectedChatRoom = chatRoom.selected;

    editChatRoom(
      selectedChatRoom._id,
      chatType,
      name,
      members,
      chatIcon,
    );
  }
  render() {
    const {
      user,
      chatRoom,
      searchUser,
      mode,
      successMessage,
    } = this.props;
    const {
      loading,
      disabled,
      name,
      chatType,
      members,
      chatIcon,
      nameValid,
    } = this.state;
    const selectedChatRoom = chatRoom.selected;
    const searchedUsers = user.searched.filter((singleUser) => {
      return !members.some((singleMember) => singleMember._id === singleUser._id);
    });
    const listDisabled = chatRoom.create.loading;
    const inputDisabled = (chatType === 'direct' && members.length === 2) || chatRoom.create.loading;
    let errorMessage = this.props.errorMessage;

    if (this.state.errorMessage.length > 0) {
      errorMessage = this.state.errorMessage;
    }

    return (
      <div className="chat-room-form">
        <Container fluid>
          <Row>
            <Col xs="12">
              {
                errorMessage.length > 0 &&
                <Alert label={errorMessage} type="danger" />
              }
              {
                errorMessage.length === 0 && successMessage.length > 0 &&
                <Alert label={successMessage} type="success" />
              }
            </Col>
            <Col xs="12">
              <Form onSubmit={::this.handleChatRoomFormValidation}>
                <Row>
                  <Col md="8">
                    <Panel>
                      {
                        loading
                          ?
                          <Fragment>
                            <Skeleton
                              className="mui-textfield"
                              height="47px"
                              width="100%"
                            />
                            <div className="user-select-wrapper">
                              <Skeleton
                                className="users-list-label"
                                height="14px"
                                width="100px"
                              />
                              <Skeleton
                                className="users-list"
                                height="34px"
                                width="100%"
                              />
                              <Skeleton
                                className="user-select"
                                height="30px"
                                width="100%"
                              />
                            </div>
                            <Skeleton
                              className="mui-btn"
                              height="36px"
                              width="146px"
                            />
                          </Fragment>
                          :
                          <Fragment>
                            {
                              mode === 'create' &&
                              <Select
                                value={chatType}
                                label="Chat Type"
                                name="chatType"
                                onChange={::this.handleChange}
                                disabled={disabled}
                              >
                                <Option value="direct" label="Direct" />
                                <Option value="group" label="Group" />
                              </Select>
                            }
                            {
                              chatType === 'group' &&
                              <Input
                                value={name}
                                label="Name"
                                type="text"
                                name="name"
                                onChange={::this.handleChange}
                                disabled={disabled}
                                invalid={!nameValid}
                              />
                            }
                            <UserSelect
                              label="Members"
                              placeholder="Select a member"
                              handleSearchUser={searchUser}
                              selectedUsers={members}
                              searchedUsers={searchedUsers}
                              onSuggestionSelected={::this.onSuggestionSelected}
                              handleDeselectUser={::this.handleDeselectMember}
                              listDisabled={listDisabled}
                              inputDisabled={inputDisabled}
                              loading={user.search.loading}
                            />
                            <Button
                              className="button button-primary"
                              type="submit"
                              disabled={disabled}
                            >
                              {
                                mode === 'create'
                                  ? 'Create Chat Room'
                                  : 'Update Chat Room'
                              }
                            </Button>
                          </Fragment>
                      }
                    </Panel>
                  </Col>
                  <Col md="4">
                    <Panel>
                      <div className="avatar-wrapper">
                        {
                          loading
                            ?
                            <Skeleton
                              className="avatar"
                              height="120px"
                              width="120px"
                              circle
                            />
                            :
                            <AvatarUploader
                              imageLink={chatIcon}
                              defaultImageLink="https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg"
                              name={name}
                              roleChatType={handleChatRoomAvatarBadges(selectedChatRoom, {}, 'role-chat')}
                              accountType={handleChatRoomAvatarBadges(selectedChatRoom)}
                              handleImageUpload={::this.handleImageUpload}
                              handleRemoveImage={::this.handleRemoveImage}
                              disabled={disabled}
                            />
                        }
                      </div>
                    </Panel>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    upload: state.upload,
  }
}

ChatRoomForm.propTypes = {
  mode: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

ChatRoomForm.defaultProps = {
  mode: 'create',
  errorMessage: '',
  successMessage: '',
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatRoomForm);
