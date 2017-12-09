import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { fetchUser } from '../actions/user';
import LoadingAnimation from '../components/LoadingAnimation';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser
  }, dispatch);
}

Layout.propTypes = {
  component: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
