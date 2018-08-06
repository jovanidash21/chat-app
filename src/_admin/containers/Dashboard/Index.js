import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel
} from 'muicss/react';
import mapDispatchToProps from '../../actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="dahsboard-section">
        <Container>
          <Row>
            <Col xs="12">
              <Panel>
                Dashboard
              </Panel>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
