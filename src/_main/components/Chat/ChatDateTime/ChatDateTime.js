import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  componentDidUpdate(prevProps) {
    if (
      prevProps.previousMessageDate.length === 0 &&
      this.props.previousMessageDate.length > 0
    ) {
      ::this.handleMessageDateTime();
    }
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
    const todayDate = new Date();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    if ( d1.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0) ) {
      return 'Today';
    } else if ( d1.setHours(0,0,0,0) === yesterdayDate.setHours(0,0,0,0) ) {
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
      messageDate,
      previousMessageDate
    } = this.props;
    if ( messageDate.length > 0 ) {
      const d1 = new Date(messageDate);
      const isDateTodayOrYesterday = ::this.isDateTodayOrYesterday(d1);
      const isDateThisYear = ::this.isDateThisYear(d1);

      if ( previousMessageDate.length > 0 ) {
        const d2 = new Date(previousMessageDate);
        const isDatesSameDay = ::this.isDatesSameDay(d1, d2);

        if ( isDatesSameDay ) {
          this.setState({dateTime: false});
        } else if ( isDateTodayOrYesterday.length > 0 ) {
          this.setState({dateTime: isDateTodayOrYesterday});
        } else if ( isDateThisYear ) {
          this.setState({dateTime: moment(messageDate).format("dddd, MMMM Do")});
        } else {
          this.setState({dateTime: moment(messageDate).format("dddd, MMMM Do YYYY")});
        }
      } else {
        if ( isDateTodayOrYesterday.length > 0 ) {
          this.setState({dateTime: isDateTodayOrYesterday});
        } else if ( isDateThisYear ) {
          this.setState({dateTime: moment(messageDate).format("dddd, MMMM Do")});
        } else {
          this.setState({dateTime: moment(messageDate).format("dddd, MMMM Do YYYY")});
        }
      }
    }
  }
  render() {
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
  messageDate: PropTypes.string.isRequired,
  previousMessageDate: PropTypes.string.isRequired
}

export default ChatDateTime;
