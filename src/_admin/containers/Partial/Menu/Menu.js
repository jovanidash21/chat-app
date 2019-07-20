import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions';
import { MenuItem } from '../../../components/LeftSideDrawer';
import './styles.scss';

const menuItems = [
  {
    icon: "tachometer-alt",
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: "user",
    title: "User",
    subMenuItems: [
      { title: "All Users", link: "/all-users" },
      { title: "Create User", link: "/create-user" },
    ],
  },
  {
    icon: "door-closed",
    title: "Chat Room",
    subMenuItems: [
      { title: "All Chat Rooms", link: "/all-chat-rooms" },
      { title: "Create Chat Room", link: "/create-chat-room" },
    ],
  }
];

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menusListScrolled: false,
      openMenuItem: -1,
    };
  }
  componentDidMount() {
    this.menusList.addEventListener('scroll', ::this.handleMenusListScroll, true);
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.router.location.pathname !== this.props.router.location.pathname ) {
      this.props.handleLeftSideDrawerToggleEvent();
    }
  }
  handleMenusListScroll() {
    if ( this.menusList.scrollTop > 10 ) {
      this.setState({menusListScrolled: true});
    } else {
      this.setState({menusListScrolled: false});
    }
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
    const { router } = this.props;
    const {
      menusListScrolled,
      openMenuItem,
    } = this.state;

    return (
      <div style={{height: '100%'}}>
        <div className="admin-menu-wrapper">
          <h1 className="title">
            Admin Panel
          </h1>
          <div className={"scroll-shadow " + (menusListScrolled ? 'scrolled' : '')} />
          <div
            className="menus-list"
            ref={(element) => { this.menusList = element; }}
          >
            {
              menuItems.length > 0 &&
              menuItems.map((singleMenuItem, i) => {
                let isSubMenuActive = false;

                if (
                  'subMenuItems' in singleMenuItem &&
                  singleMenuItem.subMenuItems.length > 0 &&
                  singleMenuItem.subMenuItems.some((singleSubMenuItem) =>
                    singleSubMenuItem.link === router.location.pathname
                  )
                ) {
                  isSubMenuActive = true;
                }

                return (
                  <MenuItem
                    key={i}
                    index={i}
                    icon={singleMenuItem.icon}
                    title={singleMenuItem.title}
                    link={('link' in singleMenuItem ? singleMenuItem.link : '')}
                    open={openMenuItem === i}
                    subMenuActive={isSubMenuActive}
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
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    router: state.router,
    user: state.user,
    chatRoom: state.chatRoom,
  }
}

Menu.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
