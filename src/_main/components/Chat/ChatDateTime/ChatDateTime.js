import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  isDateToday,
  isDateYesterday,
  isDateThisYear,
  isDatesSameDay,
} from '../../../../utils/date';
import './styles.scss';

class ChatDateTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: '',
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
  handleMessageDateTime() {
    const {
      messageDate,
      previousMessageDate
    } = this.props;
    if ( messageDate.length > 0 ) {
      const isMessageDateToday = isDateToday(messageDate);
      const isMessageDateYesterday = isDateYesterday(messageDate);
      const isMessageDateThisYear = isDateThisYear(messageDate);

      if (previousMessageDate.length > 0 && isDatesSameDay(messageDate, previousMessageDate)) {
        this.setState({dateTime: false});
      } else if (isMessageDateToday) {
        this.setState({dateTime: 'Today'});
      } else if (isMessageDateYesterday) {
        this.setState({dateTime: 'Yesterday'});
      } else if (isMessageDateThisYear) {
        this.setState({dateTime: moment(messageDate).format("dddd, MMMM Do")});
      } else {
        this.setState({dateTime: moment(messageDate).format("dddd, MMMM Do YYYY")});
      }
    }
  }
  render() {
    const { small } = this.props;
    const { dateTime } = this.state;

    if ( dateTime.length > 0 ) {
      return (
        <div className={"chat-date-time " + (small ? 'small' : '')}>
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
  previousMessageDate: PropTypes.string.isRequired,
  small: PropTypes.bool,
}

ChatDateTime.defaultProps = {
  small: false,
}

export default ChatDateTime;
