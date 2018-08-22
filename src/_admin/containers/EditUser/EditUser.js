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

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    ::this.handleFetchSelectedtUser();
  }
  handleFetchSelectedtUser() {
    const {
      match,
      fetchSelectedUser
    } = this.props;
    const userID = match.params.userID;

    fetchSelectedUser(userID);
  }
  render() {
    const { user } = this.props;

    return (
      <div className="create-user-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              {
                !user.isEditing &&
                !user.isEditingSuccess &&
                <Alert label="Sorry! Please try again." />
              }
            </Col>
          </Row>
          <UserForm mode="edit" />
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
)(EditUser);
