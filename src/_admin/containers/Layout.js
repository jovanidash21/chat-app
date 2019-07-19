import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Route } from 'react-router';
import mapDispatchToProps from '../actions';
import Head from '../../components/Head';
import { Menu } from './Partial';
import {
  Header,
  LeftSideDrawer,
  Footer,
} from './Common';
import '../styles/Admin.scss';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftSideDrawerOpen: false,
    };
  }
  componentWillMount() {
    const { fetchActiveUser } = this.props;

    fetchActiveUser();
    document.body.className = '';
    document.body.classList.add('admin-page');
  }
  handleLeftSideDrawerRender() {
    const { leftSideDrawerOpen } = this.state;

    return (
      <MediaQuery query="(max-width: 767px)">
        {(matches) => {
          return (
            <LeftSideDrawer
              handleLeftSideDrawerToggleState={::this.handleLeftSideDrawerToggleState}
              open={matches ? leftSideDrawerOpen : true}
              noOverlay={matches ? false : true}
            >
              <Menu handleLeftSideDrawerToggleEvent={::this.handleLeftSideDrawerToggleEvent} />
            </LeftSideDrawer>
          )
        }}
      </MediaQuery>
    )
  }
  handleLeftSideDrawerToggleEvent(openTheDrawer=false) {
    this.setState({leftSideDrawerOpen: openTheDrawer});
  }
  handleLeftSideDrawerToggleState(state) {
    this.setState({leftSideDrawerOpen: state.isOpen});
  }
  handleComponentRender(matchProps) {
    const {
      component: Content,
      title,
    } = this.props;

    return (
      <div className="admin-section">
        <Head title={"Chat App " + (title.length > 0 ? '| ' + title : '')} />
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
  }
  render() {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={::this.handleComponentRender} />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
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
