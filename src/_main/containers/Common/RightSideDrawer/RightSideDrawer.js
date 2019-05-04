import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import mapDispatchToProps from '../../../actions';
import './styles.scss';

class RightSideDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      handleRightSideDrawerToggleState,
      isRightSideDrawerOpen,
      noOverlay,
      children,
    } = this.props;

    return (
      <Menu
        overlayClassName="right-side-drawer-overlay"
        width="250px"
        isOpen={isRightSideDrawerOpen}
        onStateChange={handleRightSideDrawerToggleState}
        noOverlay={noOverlay}
        right
      >
        <div className="right-side-drawer">
          {children}
        </div>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

RightSideDrawer.propTypes = {
  handleRightSideDrawerToggleState: PropTypes.func.isRequired,
  isRightSideDrawerOpen: PropTypes.bool,
  noOverlay: PropTypes.bool,
}

RightSideDrawer.defaultProps = {
  isRightSideDrawerOpen: false,
  noOverlay: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RightSideDrawer);
