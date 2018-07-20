import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubMenuItem from './SubMenuItem';
import './styles.scss';

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if ( !prevProps.isOpen && this.props.isOpen ) {
      this.subMenuItems.style.maxHeight = this.subMenuItems.scrollHeight + "px";
    }

    if ( prevProps.isOpen && !this.props.isOpen ) {
      this.subMenuItems.style.maxHeight = 0;
    }
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
    const {
      icon,
      title,
      isOpen,
      children
    } = this.props;

    return (
      <div className="menu-item-wrapper">
        <div className={"menu-item " + (isOpen ? 'selected' : '')} onClick={::this.handleOpenMenuItem}>
          <div className="menu-icon">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="menu-title">
            {title}
          </div>
          <div className="arrow-icon">
            <FontAwesomeIcon icon="angle-down" />
          </div>
        </div>
        <div className="sub-menu-items" ref={(element) => { this.subMenuItems = element; }}>
          {children}
        </div>
      </div>
    )
  }
}

MenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
  isOpen:PropTypes.bool,
  handleOpenMenuItem: PropTypes.func.isRequired
}

MenuItem.defaultProps = {
  icon: 'flag',
  title: 'Menu Item',
  isOpen: false
}

MenuItem.SubMenuItem = SubMenuItem;

export default MenuItem;
