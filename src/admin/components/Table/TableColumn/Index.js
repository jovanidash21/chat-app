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
      isSortActive,
      sortOrder
    } = this.props;

    if ( !isSortActive ) {
      return "exchange-alt";
    } else if ( sortOrder === 'asc' ) {
      return "sort-amount-down";
    } else {
      return "sort-amount-up";
    }
  }
  handleSortTable(event) {
    event.preventDefault();

    const {
      columnKey,
      handleSortTable
    } = this.props;

    handleSortTable(columnKey);
  }
  render() {
    const {
      label,
      isSortActive
    } = this.props;

    return (
      <th className="table-column" onClick={::this.handleSortTable}>
        {label}
        <div className={"sort-icon " + (isSortActive ? 'active' : '')}>
          <FontAwesomeIcon icon={::this.handleSortIcon()} />
        </div>
      </th>
    )
  }
}

TableColumn.propTypes = {
  columnKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSortActive: PropTypes.bool,
  sortOrder: PropTypes.string,
  handleSortTable: PropTypes.func.isRequired
}

TableColumn.defaultProps = {
  isSortActive: false,
  sortOrder: 'asc'
}

export default TableColumn;
