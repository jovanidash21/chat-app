import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages : [
        (new Message({ id: 1, message: "This is the recipient!" })),
        (new Message({ id: 0, message: "This is me" }))
      ],
    }
  }
  render() {
    return (
      <ChatFeed
        messages={this.state.messages}
        isTyping={true}
        hasInputField={false}
        bubblesCentered={false}
        bubbleStyles={
          {
            text: {
              fontSize: 14
            },
            chatbubble: {
              borderRadius: 70,
              padding: 18
            }
          }
        }
      />
    )
  }
}

export default ChatBox;
