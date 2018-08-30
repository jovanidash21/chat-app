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
