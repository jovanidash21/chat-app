import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions';
import TableColumn from '../../../Components/Table/TableColumn';
import './styles.scss';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: {
        column: null,
        direction: 'asc',
        rows: []
      }
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.rows.length === 0 && this.props.rows.length > 0 ) {
      ::this.handleSortTable(this.props.columns[0].key);
    }
  }
  handleSortTable(column) {
    const { rows } = this.props;
    const { sort } = this.state;
    var direction = 'desc';

    if ( sort.column !== null ) {
      if ( sort.column !== column ) {
        direction = 'asc';
      } else {
        if ( sort.direction === 'asc' ) {
          direction = 'desc';
        } else {
          direction = 'asc';
        }
      }
    } else {
      direction = 'asc';
    }

    var sortedData = rows.sort((a, b) => {
      var sortKey = a[column].toLowerCase().localeCompare(b[column].toLowerCase());

      return sortKey;
    });

    if ( direction === 'desc' ) {
      sortedData.reverse();
    }

    this.setState({
      sort: {
        column,
        direction,
        rows: sortedData
      }
    });
  }
  render() {
    const { columns } = this.props;
    const { sort } = this.state;

    return (
      <table className="mui-table">
        <thead>
          <tr>
            {
              columns.length > 0 &&
              columns.map((singleColumn, i) =>
                <TableColumn
                  key={i}
                  columnKey={singleColumn.key}
                  label={singleColumn.label}
                  isSortActive={sort.column === singleColumn.key}
                  sortOrder={sort.direction}
                  handleSortTable={::this.handleSortTable}
                />
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            sort.rows.length > 0 &&
            sort.rows.map((singleRow, i) =>
              <tr key={i}>
                <td>{singleRow[columns[0].key]}</td>
                <td>{singleRow[columns[1].key]}</td>
                <td>{singleRow[columns[2].key]}</td>
                <td>{singleRow[columns[3].key]}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
