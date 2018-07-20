import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions';
import MenuItem from '../../../components/LeftSideDrawer/MenuItem';
import './styles.scss';

var SubMenuItem = MenuItem.SubMenuItem;

const menuItems = [
  {
    icon: "user",
    title: "User",
    subMenuItems: [
      { title: "All Users" },
      { title: "Create User" }
    ]
  },
  {
    icon: "door-closed",
    title: "Chat Room",
    subMenuItems: [
      { title: "All Chat Rooms" },
      { title: "Create Chat Room" }
    ]
  }
];

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenuItem: -1
    };
  }
  handleOpenMenuItem(menuItemIndex) {
    const { openMenuItem } = this.state;

    if ( openMenuItem !== menuItemIndex ) {
      this.setState({openMenuItem: menuItemIndex});
    } else {
      this.setState({openMenuItem: -1});
    }
  }
  render() {
    const { openMenuItem } = this.state;

    return (
      <div style={{height: '100%'}}>
        <div className="admin-menu-wrapper">
          <h1 className="title">Admin Panel</h1>
          <div className="menus-list">
            {
              menuItems.length > 0 &&
              menuItems.map((singleMenuItem, i) =>
                <MenuItem
                  key={i}
                  index={i}
                  icon={singleMenuItem.icon}
                  title={singleMenuItem.title}
                  isOpen={openMenuItem === i}
                  handleOpenMenuItem={::this.handleOpenMenuItem}
                >
                  {
                    singleMenuItem.subMenuItems.length > 0 &&
                    singleMenuItem.subMenuItems.map((singleSubMenuItem, i) =>
                      <SubMenuItem key={i} title={singleSubMenuItem.title} />
                    )
                  }
                </MenuItem>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

Menu.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
