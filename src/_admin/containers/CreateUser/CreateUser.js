import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../actions';
import { UserForm } from '../Partial';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      successMessage: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.create.loading && this.props.user.create.loading) {
      this.setState({
        errorMessage: '',
        successMessage: '',
      });
    }

    if (prevProps.user.create.loading && !this.props.user.create.loading) {
      if (this.props.user.create.error) {
        this.setState({
          errorMessage: this.props.user.create.message,
          successMessage: '',
        });
      } else if ( this.props.user.create.success ) {
        this.setState({
          errorMessage: '',
          successMessage: this.props.user.create.message,
        });
      }
    }
  }
  render() {
    const {
      errorMessage,
      successMessage,
    } = this.state;

    return (
      <div className="create-user-section">
        <UserForm
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
)(CreateUser);
