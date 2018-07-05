import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import './styles.scss';

class ChatDateTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: ''
    };
  }
  componentWillMount() {
    ::this.handleMessageDateTime();
  }
  handleMessageDateTime() {
    const {
      message,
      previousMessage
    } = this.props;
    if (
      previousMessage.constructor === Object &&
      message.createdAt
    ) {
      if ( Object.keys(previousMessage).length > 0 ) {
        const d1 = new Date();
        const d2 = new Date(previousMessage.createdAt);
        const d3 = new Date(message.createdAt);


        if (
          d2.getFullYear() === d3.getFullYear() &&
          d2.getMonth() === d3.getMonth() &&
          d2.getDate() === d3.getDate()
        ) {
          this.setState({dateTime: false});
        } else {
          const timeDiff = d1.getTime() - d3.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          if ( daysDiff === 1 ) {
            this.setState({dateTime: "Today"});
          } else if ( daysDiff === 2 ) {
            this.setState({dateTime: "Yesterday"});
          } else {
            this.setState({dateTime: moment(message.createdAt).format("dddd, MMMM Do")});
          }
        }
      } else {
        this.setState({dateTime: moment(message.createdAt).format("dddd, MMMM Do")});
      }
    }
  }
  render() {
    const { message } = this.props;
    const { dateTime } = this.state;

    if ( dateTime.length > 0 ) {
      return (
        <div className="chat-date-time">
          <span>
            {dateTime}
          </span>
        </div>
      )
    } else {
      return(null);
    }
  }
}

ChatDateTime.propTypes = {
  message: PropTypes.object.isRequired,
  previousMessage: PropTypes.object.isRequired
}

export default ChatDateTime;
