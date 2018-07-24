import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions';
import LoadingAnimation from '../../../components/LoadingAnimation';
import TableColumn from '../../../Components/Table/TableColumn';
import Pagination from '../../../Components/Table/Pagination';
import './styles.scss';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,
      sort: {
        column: null,
        direction: 'asc'
      },
      dataRows: []
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.isLoading && !this.props.isLoading ) {
      ::this.handleSortTable(this.props.columns[0].key);
    }
  }
  handleDataRowsChange(column, direction, page) {
    const { rows } = this.props;
    const { itemsCountPerPage } = this.state;
    const lastItemIndex = page * itemsCountPerPage;
    const firstItemIndex = lastItemIndex - itemsCountPerPage;

    var sortedData = rows.sort((a, b) => {
      var sortKey = a[column].toLowerCase().localeCompare(b[column].toLowerCase());

      return sortKey;
    });

    if ( direction === 'desc' ) {
      sortedData.reverse();
    }

    sortedData = sortedData.slice(firstItemIndex, lastItemIndex);

    this.setState({dataRows: sortedData});
  }
  handleTableRender() {
    const {
      columns,
      rows,
      isLoading
    } = this.props;
    const {
      activePage,
      itemsCountPerPage,
      sort,
      dataRows
    } = this.state;

    if ( !isLoading ) {
      return (
        <div>
          <table className="mui-table mui-table--bordered">
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
                columns.length > 0 &&
                dataRows.length > 0 &&
                dataRows.map((singleRow, i) =>
                  <tr key={i}>
                    {
                      columns.map((singleColumn, i) =>
                        <td key={i}>
                          {singleRow[singleColumn.key]}
                        </td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>
          <div className="pagination-wrapper">
            <Pagination
              handleChangePage={::this.handleChangePage}
              activePage={activePage}
              totalCount={rows.length}
              itemsCountPerPage={itemsCountPerPage}
            />
          </div>
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  handleSortTable(column) {
    const { rows } = this.props;
    const {
      activePage,
      sort
    } = this.state;
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

    this.setState({
      sort: {
        column,
        direction
      }
    });

    ::this.handleDataRowsChange(column, direction, activePage);
  }
  handleChangePage(page) {
    const { sort } = this.state;

    this.setState({activePage: page});

    ::this.handleDataRowsChange(sort.column, sort.direction, page);
  }
  render() {
    const { columns } = this.props;
    const { sort } = this.state;

    return (
      <div className="table">
        {::this.handleTableRender()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
}

Table.defaultProps = {
  isLoading: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
