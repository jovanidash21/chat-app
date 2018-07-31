import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Route } from 'react-router';
import mapDispatchToProps from '../actions';
import Menu from './Partial/Menu';
import Header from './Common/Header';
import LeftSideDrawer from './Common/LeftSideDrawer';
import Footer from './Common/Footer';
import Head from '../components/Head';
import LoadingAnimation from '../components/LoadingAnimation';
import '../styles/Admin.scss';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLeftSideDrawerOpen: false
    };
  }
  componentWillMount() {
    const {
      fetchUser
    } = this.props;

    fetchUser();
    document.body.className = '';
    document.body.classList.add('admin-page');
  }
  handleLeftSideDrawerRender() {
    const { isLeftSideDrawerOpen } = this.state;

    return (
      <MediaQuery query="(max-width: 767px)">
        {(matches) => {
          return (
            <LeftSideDrawer
              handleLeftSideDrawerToggleState={::this.handleLeftSideDrawerToggleState}
              isLeftSideDrawerOpen={matches ? isLeftSideDrawerOpen : true}
              noOverlay={matches ? false : true}
            >
              <Menu handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent} />
            </LeftSideDrawer>
          )
        }}
      </MediaQuery>
    )
  }
  handleLeftSideDrawerToggleEvent(openTheDrawer: false) {
    this.setState({isLeftSideDrawerOpen: openTheDrawer});
  }
  handleLeftSideDrawerToggleState(state) {
    this.setState({isLeftSideDrawerOpen: state.isOpen});
  }
  handleComponentRender(matchProps) {
    const {
      component: Content,
      title,
      user
    } = this.props;

    if ( !user.isFetchingActive && user.isFetchingActiveSuccess ) {
      return (
        <div className="admin-section">
          <Head title={"Chat App | " + title} />
          {::this.handleLeftSideDrawerRender()}
          <Header handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent}>
            <div className="page-title">
              {title}
            </div>
          </Header>
          <div className="admin-content">
            <Content {...matchProps} />
          </div>
          <Footer />
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="pacman" color="#26a69a" />
      )
    }
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
    user: state.user
  }
}

Layout.propTypes = {
  component: PropTypes.func.isRequired,
  title: PropTypes.string
}

Layout.defaultProps = {
  title: ''
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
