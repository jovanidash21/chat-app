import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { formatNumber } from '../../../utils/number';
import { CardBanner } from '../../components/CardBanner';
import { LineChart } from '../../components/Chart';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {
      fetchUsersCount,
      fetchUsersGraph,
      fetchChatRoomsCount,
      fetchMessagesCount,
    } = this.props;

    fetchUsersCount();
    fetchUsersGraph();
    fetchChatRoomsCount();
    fetchMessagesCount();
  }
  render() {
    const {
      user,
      chatRoom,
      message,
    } = this.props;

    return (
      <div className="dahsboard-section">
        <Container fluid>
          <Row>
            <Col lg="4" md="6" xs="12">
              <CardBanner
                label="Users"
                count={formatNumber(user.count)}
                icon="user"
                color="green"
                link="/all-users"
                loading={user.fetchCount.loading}
              />
            </Col>
            <Col lg="4" md="6" xs="12">
              <CardBanner
                label="Chat Rooms"
                count={formatNumber(chatRoom.count)}
                icon="door-closed"
                color="yellow"
                link="/all-chat-rooms"
                loading={chatRoom.fetchCount.loading}
              />
            </Col>
            <Col lg="4" md="6" xs="12">
              <CardBanner
                label="Messages"
                count={formatNumber(message.count)}
                icon="comment"
                color="red"
                loading={message.fetchCount.loading}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <LineChart
                title="Users"
                data={user.graph}
                xAxisKey="month"
                yAxisKey="users"
                loading={user.fetchGraph.loading}
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
    message: state.message,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
