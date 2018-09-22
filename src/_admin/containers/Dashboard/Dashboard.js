import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { CardBanner } from '../../components/CardBanner';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {
      fetchUsersCount,
      fetchUsersGraph,
      fetchChatRoomsCount,
      fetchMessagesCount
    } = this.props;

    fetchUsersCount();
    fetchUsersGraph();
    fetchChatRoomsCount();
    fetchMessagesCount();
  }
  handleCountRender(count) {
    if ( count >= 1000000 ) {
      return new Intl.NumberFormat().format(Math.round((count/1000000)*10)/10) + 'M';
    } else if ( count >= 1000 ) {
      return new Intl.NumberFormat().format(Math.round((count/1000)*10)/10) + 'k';
    } else {
      return new Intl.NumberFormat().format(Math.round(count*10)/10);
    }
  }
  render() {
    const {
      user,
      chatRoom,
      message
    } = this.props;

    return (
      <div className="dahsboard-section">
        <Container fluid={true}>
          <Row>
            <Col lg="4" md="6" xs="12">
              <CardBanner
                label="Users"
                count={::this.handleCountRender(user.count)}
                icon="user"
                color="green"
                link="/all-users"
              />
            </Col>
            <Col lg="4" md="6" xs="12">
              <CardBanner
                label="Chat Rooms"
                count={::this.handleCountRender(chatRoom.count)}
                icon="door-closed"
                color="yellow"
                link="/all-chat-rooms"
              />
            </Col>
            <Col lg="4" md="6" xs="12">
              <CardBanner
                label="Messages"
                count={::this.handleCountRender(message.count)}
                icon="comment"
                color="red"
              />
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
    message: state.message
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
