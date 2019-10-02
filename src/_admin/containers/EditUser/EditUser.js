import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../actions';
import { UserForm } from '../Partial';
import { MenuButton } from '../../components/MenuButton';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      successMessage: '',
    };
  }
  componentWillMount() {
    ::this.handleFetchSelectedUser();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.edit.loading && this.props.user.edit.loading) {
      this.setState({
        errorMessage: '',
        successMessage: '',
      });
    }

    if (prevProps.user.edit.loading && ! this.props.user.edit.loading) {
      if (this.props.user.edit.error) {
        this.setState({
          errorMessage: this.props.user.edit.message,
          successMessage: '',
        });
      } else if (this.props.user.edit.success) {
        this.setState({
          errorMessage: '',
          successMessage: this.props.user.edit.message,
        });
      }
    }
  }
  handleFetchSelectedUser() {
    const {
      match,
      fetchSelectedUser,
    } = this.props;
    const userID = match.params.userID;

    fetchSelectedUser(userID);
  }
  render() {
    const {
      errorMessage,
      successMessage,
    } = this.state;

    return (
      <div className="create-user-section">
        <UserForm
          mode="edit"
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);
