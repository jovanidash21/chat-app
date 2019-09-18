import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubMenuItem } from './SubMenuItem';
import './styles.scss';

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.children.length > 0) {
      if (!prevProps.open && this.props.open) {
        this.subMenuItems.style.maxHeight = this.subMenuItems.scrollHeight + 'px';
      }

      if (prevProps.open && !this.props.open) {
        this.subMenuItems.style.maxHeight = 0;
      }
    }
  }
  handleMenuItemRender() {
    const {
      icon,
      title,
      link,
      open,
      subMenuActive,
      children,
    } = this.props;

    return (
      <Fragment>
        <div
          className={
            "menu-item " +
            (subMenuActive ? 'active ' : '') +
            (open ? 'selected' : '')
          }
          onClick={(link.length === 0 ? ::this.handleOpenMenuItem : () => {})}
        >
          <div className="menu-icon">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="menu-title">
            {title}
          </div>
          {
            children.length > 0 &&
            <div className="arrow-icon">
              <FontAwesomeIcon icon="angle-down" />
            </div>
          }
        </div>
        {
          children.length > 0 &&
          <div className="sub-menu-items" ref={(element) => { this.subMenuItems = element; }}>
            {children}
          </div>
        }
      </Fragment>
    )
  }
  handleOpenMenuItem(event) {
    event.preventDefault();

    const {
      index,
      handleOpenMenuItem,
    } = this.props;

    handleOpenMenuItem(index);
  }
  render() {
    const { link } = this.props;

    return (
      <div className="menu-item-wrapper">
        {
          link.length > 0
            ?
            <NavLink to={link}>
              {::this.handleMenuItemRender()}
            </NavLink>
            :
            ::this.handleMenuItemRender()
        }
      </div>
    )
  }
}

MenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  open: PropTypes.bool,
  subMenuActive: PropTypes.bool,
  handleOpenMenuItem: PropTypes.func.isRequired,
}

MenuItem.defaultProps = {
  icon: 'flag',
  title: 'Menu Item',
  link: '',
  open: false,
  subMenuActive: false,
}

MenuItem.SubMenuItem = SubMenuItem;

export default MenuItem;
