import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

class TableColumn extends Component {
  constructor(props) {
    super(props);
  }
  handleSortIcon() {
    const {
      sortActive,
      sortOrder,
    } = this.props;

    if (!sortActive) {
      return "exchange-alt";
    } else if (sortOrder === 'asc') {
      return "sort-amount-down";
    } else {
      return "sort-amount-up";
    }
  }
  handleSortTable(event) {
    event.preventDefault();

    const {
      columnKey,
      handleSortTable,
      disabled,
    } = this.props;

    if (!disabled) {
      handleSortTable(columnKey);
    }
  }
  render() {
    const {
      label,
      sortActive,
      sortOrder,
      disabled,
    } = this.props;
    let sortTitle = '';

    if (sortActive && sortOrder === 'asc') {
      sortTitle = 'Ascending';
    } else if (sortActive && sortOrder === 'desc') {
      sortTitle = 'Descending';
    }

    return (
      <th
        className={
          "table-column " +
          (sortActive ? 'active ' : '') +
          (disabled ? 'disabled' : '')
        }
        onClick={::this.handleSortTable}
      >
        {label}
        <div className="sort-icon" title={sortTitle}>
          <FontAwesomeIcon icon={::this.handleSortIcon()} />
        </div>
      </th>
    )
  }
}

TableColumn.propTypes = {
  columnKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sortActive: PropTypes.bool,
  sortOrder: PropTypes.string,
  handleSortTable: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

TableColumn.defaultProps = {
  sortActive: false,
  sortOrder: 'asc',
  disabled: false,
}

export default TableColumn;
