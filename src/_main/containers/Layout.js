import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import mapDispatchToProps from '../actions';
import Head from '../../components/Head';

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { fetchActiveUser } = this.props;

    fetchActiveUser();
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.user.fetchActive.loading && ! this.props.user.fetchActive.loading) {
      this.props.socketUserLogin(this.props.user.active._id);
    }
  }
  handleComponentRender(matchProps) {
    const {
      component: Content,
      title,
    } = this.props;

    return (
      <Fragment>
        <Head title={"Chat App " + (title.length > 0 ? '| ' + title : '')} />
        <Content {...matchProps} />
      </Fragment>
    )
  }
  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={::this.handleComponentRender} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

Layout.propTypes = {
  component: PropTypes.func.isRequired,
  title: PropTypes.string,
}

Layout.defaultProps = {
  title: '',
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
