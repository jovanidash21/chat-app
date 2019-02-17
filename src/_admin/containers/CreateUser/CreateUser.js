import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import { UserForm } from '../Partial';
import { Alert } from '../../../components/Alert';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;

    return (
      <div className="create-user-section">
        <Container fluid>
          <Row>
            <Col xs="12">
              {
                ( user.create.success || user.create.error ) &&
                <Alert label={user.create.message} type={(user.create.success ? 'success' : 'danger')} />
              }
            </Col>
          </Row>
          <UserForm />
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
