import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import mapDispatchToProps from '../actions';
import LoadingAnimation from '../components/LoadingAnimation';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {
      fetchUser,
      fetchUsers
    } = this.props;

    fetchUser();
    fetchUsers();
  }
  handleComponent(matchProps) {
    const {
      component: Content,
      user
    } = this.props;

    if (!user.isLoading && user.isSuccess) {
      return (
        <Content {...matchProps} />
      )
    } else {
      return (
        <LoadingAnimation name="pacman" color="#4bb06b" />
      )
    }
  }
  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={::this.handleComponent} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Layout.propTypes = {
  component: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
