import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import {
  Form,
  Input,
  Checkbox,
  Button
} from 'muicss/react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

class CreateChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatRoomName: '',
      selectMember: '',
      suggestions: [],
      members: [this.props.userData],
      isPrivate: false
    }
  }
  onChatRoomNameChange(event) {
    event.preventDefault();

    this.setState({chatRoomName: event.target.value});
  }
  onSelectMemberChange(event, {newValue}) {
    this.setState({selectMember: newValue});
  };
  handleGetSuggestions(value) {
    const {
      userData,
      users
    } = this.props;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : users.filter(user =>
      userData._id !== user._id &&
      user.name &&
      user.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  handleGetSuggestionValue(suggestion) {
    return suggestion.name;
  }
  handleRenderSuggestion(suggestion, {query}) {
    const suggestionText = suggestion.name;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className="suggestion-content">
        <div className="user-image" style={{backgroundImage: `url(${suggestion.profilePicture})`}}></div>
        {
          parts.map((part, i) => {
            return (
              <span
                key={i}
                className={"user-name " + (part.highlight ? 'highlight' : '')}
              >
                {part.text}
              </span>
            );
          })
        }
      </span>
    );
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

    this.setState({selectMember: ''});
  }
  onSuggestionsFetchRequested({value}) {
    this.setState({suggestions: ::this.handleGetSuggestions(value)});
  };
  onSuggestionsClearRequested() {
    this.setState({suggestions: []});
  };
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
      members,
      isPrivate
    } = this.state;
    let data = {
      name: chatRoomName,
      members: members,
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
    const {
      selectMember,
      suggestions,
      members,
      isPrivate
    } = this.state;
    const inputProps = {
      placeholder: 'Select a member',
      value: selectMember,
      onChange: ::this.onSelectMemberChange
    };

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
            <div className="members-list">
              {
                members.map((memberData, i) =>
                  <div key={i} className="member-wrapper">
                    <div className="member" title={memberData.name}>
                      <div
                        className="member-image"
                        style={{backgroundImage: `url(${memberData.profilePicture})`}}
                      />
                      <div className="member-name">
                        {memberData.name}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={::this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={::this.onSuggestionsClearRequested}
              getSuggestionValue={::this.handleGetSuggestionValue}
              renderSuggestion={::this.handleRenderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={::this.onSuggestionSelected}
              highlightFirstSuggestion={true}
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

CreateChatRoomModal.propTypes = {
  handleDeactivateModal: PropTypes.func.isRequired,
  handleAddChatRoom: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
}

CreateChatRoomModal.defaultProps = {
  isLoading: false
}

export default CreateChatRoomModal;
