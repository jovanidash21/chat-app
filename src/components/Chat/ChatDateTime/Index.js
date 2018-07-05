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
  isDatesSameDay(d1, d2) {
    if (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    ) {
      return true
    }

    return false;
  }
  isDateTodayOrYesterday(d1) {
    const d2 = new Date();
    const timeDiff = d1.getTime() - d2.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if ( daysDiff === 0 ) {
      return 'Today';
    } else if ( daysDiff === -1 ) {
      return 'Yesterday';
    }

    return false;
  }
  isDateThisYear(d1) {
    const d2 = new Date();

    if ( d1.getFullYear() === d2.getFullYear() ) {
      return true;
    }

    return false;
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
        const thisMessageDate = new Date(message.createdAt);
        const previousMessageDate = new Date(previousMessage.createdAt);
        const isDatesSameDay = ::this.isDatesSameDay(thisMessageDate, previousMessageDate);
        const isDateTodayOrYesterday = ::this.isDateTodayOrYesterday(thisMessageDate);
        const isDateThisYear = ::this.isDateThisYear(thisMessageDate);

        if ( isDatesSameDay ) {
          this.setState({dateTime: false});
        } else if ( isDateTodayOrYesterday.length > 0 ) {
          this.setState({dateTime: isDateTodayOrYesterday});
        } else if ( isDateThisYear ) {
          this.setState({dateTime: moment(message.createdAt).format("dddd, MMMM Do")});
        } else {
          this.setState({dateTime: moment(message.createdAt).format("dddd, MMMM Do YYYY")});
        }
      } else {
        const thisMessageDate = new Date(message.createdAt);
        const isDateTodayOrYesterday = ::this.isDateTodayOrYesterday(thisMessageDate);
        const isDateThisYear = ::this.isDateThisYear(thisMessageDate);

        if ( isDateTodayOrYesterday.length > 0 ) {
          this.setState({dateTime: isDateTodayOrYesterday});
        } else if ( isDateThisYear ) {
          this.setState({dateTime: moment(message.createdAt).format("dddd, MMMM Do")});
        } else {
          this.setState({dateTime: moment(message.createdAt).format("dddd, MMMM Do YYYY")});
        }
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
