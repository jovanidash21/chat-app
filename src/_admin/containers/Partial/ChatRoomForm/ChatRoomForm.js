import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel,
  Form,
  Input,
  Select,
  Option,
  Button
} from 'muicss/react';
import Popup from 'react-popup';
import mapDispatchToProps from '../../../actions';
import { LoadingAnimation } from '../../../../components/LoadingAnimation';
import { UserSelect } from '../../../../components/UserSelect';
import { Avatar } from '../../../../components/Avatar';
import { AvatarUploader } from '../../../components/Form';
import './styles.scss';

class ChatRoomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isDisabled: false,
      chatType: 'direct',
      name: '',
      members: [],
      chatIcon: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg'
    };
  }
  componentWillMount() {
    if ( this.props.mode === 'create' ) {
      this.setState({
        isLoading: false
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.upload.isUploadingImage &&
      !this.props.upload.isUploadingImage &&
      this.props.upload.isUploadingImageSuccess
    ) {
      this.setState({
        chatIcon: this.props.upload.imageLink
      });
    }

    if ( this.props.mode === 'create' ) {
      if (
        prevProps.chatRoom.isCreating &&
        !this.props.chatRoom.isCreating &&
        this.props.chatRoom.isCreatingSuccess
      ) {
        this.setState({
          chatType: '',
          name: '',
          members: [],
          chatIcon: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg'
        });
      }

      if ( !prevProps.chatRoom.isCreating && this.props.chatRoom.isCreating ) {
        this.setState({
          isDisabled: true
        });
      }

      if (
        prevProps.chatRoom.isCreating &&
        !this.props.chatRoom.isCreating
      ) {
        this.setState({
          isDisabled: false
        });
      }
    }

    if ( this.props.mode === 'edit' ) {
      if (
        prevProps.chatRoom.isFetchingSelected &&
        !this.props.chatRoom.isFetchingSelected
      ) {
        ::this.handleDisplayeSelectedChatRoom();
      }

      if ( !prevProps.chatRoom.isEditing && this.props.chatRoom.isEditing ) {
        this.setState({
          isDisabled: true
        });
      }

      if (
        prevProps.chatRoom.isEditing &&
        !this.props.chatRoom.isEditing
      ) {
        this.setState({
          isDisabled: false
        });
      }
    }
  }
  handleAccountType() {
    const { chatRoom } = this.props;
    var accountType = '';
    const selectedChatRoom = chatRoom.selected;

    switch ( selectedChatRoom.chatType ) {
      case 'private':
        if ( selectedChatRoom.members.length > 0 ) {
          accountType = selectedChatRoom.members[0].accountType;
        }
        break;
      default:
        break;
    }

    return accountType;
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
  handleRenderSuggestion(suggestion, parts) {
    return (
      <span className="suggestion-content">
        <Avatar
          image={suggestion.profilePicture}
          size="27px"
          title={suggestion.name}
          accountType={suggestion.accountType}
          badgeCloser
        />
        {
          parts.map((part, i) => {
            return (
              <span
                key={i}
                className={"user-name " + (part.highlight ? 'highlight' : '')}
              >
                {part.text.replace(/ /g, "\u00a0")}
              </span>
            );
          })
        }
      </span>
    );
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
  handleChatRoomFormRender() {
    const {
      user,
      chatRoom,
      searchUser,
      mode
    } = this.props;
    const {
      isLoading,
      isDisabled,
      name,
      chatType,
      members,
      chatIcon
    } = this.state;
    const searchedUsers = user.search.filter((singleUser) => {
      return !members.some((singleMember) => singleMember._id === singleUser._id);
    });
    const isListDisabled = chatRoom.isCreating;
    const isInputDisabled = (chatType === 'direct' && members.length === 2) || chatRoom.isCreating;

    if ( !isLoading ) {
      return (
        <div>
          {
            mode === 'create' &&
            <Select
              value={chatType}
              label="Chat Type"
              name="chatType"
              onChange={::this.handleChange}
              disabled={isDisabled}
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
              autoComplete="off"
              floatingLabel={true}
              required={true}
              onChange={::this.handleChange}
              disabled={isDisabled}
            />
          }
          <UserSelect
            label="Members"
            placeholder="Select a member"
            handleSearchUser={searchUser}
            selectedUsers={members}
            searchedUsers={searchedUsers}
            handleRenderSuggestion={::this.handleRenderSuggestion}
            onSuggestionSelected={::this.onSuggestionSelected}
            handleDeselectUser={::this.handleDeselectMember}
            isListDisabled={isListDisabled}
            isInputDisabled={isInputDisabled}
          />
          <Button
            className="button button-primary"
            type="submit"
            disabled={isDisabled}
          >
            {
              mode === 'create'
                ? 'Create Chat Room'
                : 'Update Chat Room'
            }
          </Button>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  handleAvatarUploadRender() {
    const {
      isLoading,
      isDisabled,
      name,
      chatIcon
    } = this.state;

    if ( !isLoading ) {
      return (
        <AvatarUploader
          imageLink={chatIcon}
          defaultImageLink="https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg"
          name={name}
          accountType={::this.handleAccountType()}
          handleImageUpload={::this.handleImageUpload}
          handleRemoveImage={::this.handleRemoveImage}
          isDisabled={isDisabled}
        />
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  handleDisplayeSelectedChatRoom() {
    const {
      chatRoom,
      mode
    } = this.props;

    if ( mode === 'edit' ) {
      const selectedChatRoom = chatRoom.selected;

      this.setState({
        isLoading: false,
        chatType: selectedChatRoom.chatType,
        name: selectedChatRoom.name,
        members: selectedChatRoom.members,
        chatIcon: selectedChatRoom.chatIcon
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

    if ( image.type.indexOf('image/') === -1 ) {
      Popup.alert('Please select an image file');
    } else if ( image.size > 1024 * 1024 * 2 ) {
      Popup.alert('Maximum upload file size is 2MB only');
    } else {
      uploadImage(image);
    }
  }
  handleRemoveImage() {
    this.setState({chatIcon: 'https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg'});
  }
  handleSubmitChatRoomForm(event) {
    event.preventDefault();

    const { mode } = this.props;
    const {
      chatType,
      members
    } = this.state

    if ( chatType === 'direct' && members.length !== 2 ) {
      Popup.alert('Please select 2 members on Direct Chat Room');
    } else if ( chatType === 'group' && members.length < 3 ) {
      Popup.alert('Please select at least 3 members');
    } else {
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
  }
  handleCreateChatRoom() {
    const { createChatRoom } = this.props;
    const {
      chatType,
      name,
      members,
      chatIcon
    } = this.state;

    createChatRoom(
      chatType,
      name,
      members,
      chatIcon
    );
  }
  handleEditChatRoom() {
    const {
      chatRoom,
      editChatRoom
    } = this.props;
    const {
      chatType,
      name,
      members,
      chatIcon
    } = this.state;
    const selectedChatRoom = chatRoom.selected;

    editChatRoom(
      selectedChatRoom._id,
      chatType,
      name,
      members,
      chatIcon
    );
  }
  render() {
    return (
      <div className="chat-room-form">
        <Form onSubmit={::this.handleSubmitChatRoomForm}>
          <Row>
            <Col md="8">
              <Panel>
                {::this.handleChatRoomFormRender()}
              </Panel>
            </Col>
            <Col md="4">
              <Panel>
                {::this.handleAvatarUploadRender()}
              </Panel>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom,
    upload: state.upload
  }
}

ChatRoomForm.propTypes = {
  mode: PropTypes.string
}

ChatRoomForm.defaultProps = {
  mode: 'create'
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomForm);
