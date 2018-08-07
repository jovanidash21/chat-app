import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import Table from '../Partial/Table';
import UserForm from '../Partial/UserForm';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="create-user-section">
        <Container fluid={true}>
          <Row>
            <Col md="8">
              <Panel>
                <UserForm />
              </Panel>
            </Col>
            <Col md="4">
              <Panel>
                
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
)(CreateUser);
