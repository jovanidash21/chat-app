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
import { Alert } from '../../../components/Alert';
import { Avatar } from '../../../components/Avatar';

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
  componentDidUpdate(prevProps) {
    if ( prevProps.user.isFetchingSelected && !this.props.user.isFetchingSelected ) {
      this.setState({
        isLoading: false
      });
    }
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
    const { isLoading } = this.state;

    return (
      <div className="create-user-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              {
                !user.isCreating &&
                !user.isCreatingSuccess &&
                <Alert label="Sorry! Please try again." />
              }
            </Col>
          </Row>
          <Row>
            <Col md="8">
              <Panel>
                <UserForm mode="edit" isLoading={isLoading} />
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
)(EditUser);
