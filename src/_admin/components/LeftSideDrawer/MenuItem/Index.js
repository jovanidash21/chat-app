import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubMenuItem from './SubMenuItem';
import './styles.scss';

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if ( this.props.children.length > 0 ) {
      if ( !prevProps.isOpen && this.props.isOpen ) {
        this.subMenuItems.style.maxHeight = this.subMenuItems.scrollHeight + "px";
      }

      if ( prevProps.isOpen && !this.props.isOpen ) {
        this.subMenuItems.style.maxHeight = 0;
      }
    }
  }
  handleMenuItemRender() {
    const {
      icon,
      title,
      link,
      isOpen,
      children
    } = this.props;

    return (
      <div>
        <div className={"menu-item " + (isOpen ? 'selected' : '')} onClick={(link.length === 0 ? ::this.handleOpenMenuItem : false)}>
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
      </div>
    )
  }
  handleOpenMenuItem(event) {
    event.preventDefault();

    const {
      index,
      handleOpenMenuItem
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
            <Link to={link}>
              {::this.handleMenuItemRender()}
            </Link>
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
  isOpen:PropTypes.bool,
  handleOpenMenuItem: PropTypes.func.isRequired
}

MenuItem.defaultProps = {
  icon: 'flag',
  title: 'Menu Item',
  link: '',
  isOpen: false
}

MenuItem.SubMenuItem = SubMenuItem;

export default MenuItem;
