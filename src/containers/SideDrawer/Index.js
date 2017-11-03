import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import ChatRoom from '../../components/SideDrawer/ChatRoom';
require('../../styles/SideDrawer.scss');

class SideDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="side-drawer">
        <h1 className="title">Chat App</h1>
        <div className="chat-rooms-options">
          <h3>Chat Rooms</h3>
          <div className="add-chat-room-icon">
            <FontAwesome name="plus" />
          </div>
        </div>
        
        <div className="chat-room-list">
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
          <ChatRoom name="Hello World" />
          <ChatRoom name="Hi World" />
        </div>
      </div>
    );
  }
}

export default connect()(SideDrawer);