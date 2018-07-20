import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class SubMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      icon,
      title
    } = this.props;

    return (
      <div className="sub-menu-item">
        <div className="sub-menu-title">
          {title}
        </div>
      </div>
    )
  }
}

SubMenuItem.propTypes = {
  title: PropTypes.string
}

SubMenuItem.defaultProps = {
  title: 'Menu Item'
}

export default SubMenuItem;
