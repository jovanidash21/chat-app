import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { UserForm } from '../Partial';
import { Alert } from '../../components/Alert';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;

    return (
      <div className="create-user-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              {
                !user.isCreating &&
                !user.isCreatingSuccess &&
                <Alert label="Sorry! Username already taken." />
              }
            </Col>
          </Row>
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
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
