import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

class SubMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  handleSubMenuItemRender() {
    const { title } = this.props;

    return (
      <div className="sub-menu-item">
        <div className="sub-menu-title">
          {title}
        </div>
      </div>
    )
  }
  render() {
    const { link } = this.props;

    return (
      <div className="sub-menu-item-wrapper">
        {
          link.length > 0
            ?
            <Link to={link}>
              {::this.handleSubMenuItemRender()}
            </Link>
            :
            ::this.handleSubMenuItemRender()
        }
      </div>
    )
  }
}

SubMenuItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string
}

SubMenuItem.defaultProps = {
  title: 'Menu Item',
  link: ''
}

export default SubMenuItem;
