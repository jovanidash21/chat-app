import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions';
import MenuItem from '../../../components/LeftSideDrawer/MenuItem';
import './styles.scss';

const menuItems = [
  {
    icon: "tachometer-alt",
    title: "Dashboard",
    link: "/admin"
  },
  {
    icon: "user",
    title: "User",
    subMenuItems: [
      { title: "All Users", link: "/admin/all-users" },
      { title: "Create User", link: "/admin/create-user" }
    ]
  },
  {
    icon: "door-closed",
    title: "Chat Room",
    subMenuItems: [
      { title: "All Chat Rooms", link: "" },
      { title: "Create Chat Room", link: "" }
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
                  link={('link' in singleMenuItem ? singleMenuItem.link : '')}
                  isOpen={openMenuItem === i}
                  handleOpenMenuItem={::this.handleOpenMenuItem}
                >
                  {
                    'subMenuItems' in singleMenuItem &&
                    singleMenuItem.subMenuItems.length > 0 &&
                    singleMenuItem.subMenuItems.map((singleSubMenuItem, i) =>
                      <MenuItem.SubMenuItem
                        key={i}
                        title={singleSubMenuItem.title}
                        link={singleSubMenuItem.link}
                      />
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
