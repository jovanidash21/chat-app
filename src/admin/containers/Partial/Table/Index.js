import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions';
import LoadingAnimation from '../../../components/LoadingAnimation';
import TableColumn from '../../../Components/Table/TableColumn';
import SearchFilter from '../../../Components/Table/SearchFilter';
import Pagination from '../../../Components/Table/Pagination';
import './styles.scss';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRows: 0,
      activePage: 1,
      itemsCountPerPage: 10,
      searchFilter: '',
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
  handleDataRowsChange(filter, column, direction, page) {
    const { rows } = this.props;
    const { itemsCountPerPage } = this.state;
    var dataRows = rows;
    const lastItemIndex = page * itemsCountPerPage;
    const firstItemIndex = lastItemIndex - itemsCountPerPage;

    if ( filter.length > 0 ) {
      var filteredData = [];

      for (var i = 0; i < dataRows.length; i++) {
        var singleDataRow = dataRows[i];

        for ( var key in singleDataRow ) {
          if (
            singleDataRow[key].length > 0 &&
            singleDataRow[key].toLowerCase().match(filter)
          ) {
            filteredData.push(singleDataRow);
          }
        }
      }

      dataRows = filteredData;
    }

    this.setState({totalRows: dataRows.length});

    dataRows = dataRows.sort((a, b) => {
      var sortKey = a[column].toLowerCase().localeCompare(b[column].toLowerCase());

      return sortKey;
    });

    if ( direction === 'desc' ) {
      dataRows.reverse();
    }

    dataRows = dataRows.slice(firstItemIndex, lastItemIndex);

    this.setState({dataRows: dataRows});
  }
  handleTableRender() {
    const {
      columns,
      rows,
      isLoading
    } = this.props;
    const {
      totalRows,
      activePage,
      itemsCountPerPage,
      sort,
      dataRows
    } = this.state;

    if ( !isLoading ) {
      return (
        <div>
          <div className="search-filter-wrapper">
            <SearchFilter onSearchFilterChange={::this.onSearchFilterChange} />
          </div>
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
          {
            totalRows > itemsCountPerPage &&
            <div className="pagination-wrapper">
              <Pagination
                handleChangePage={::this.handleChangePage}
                activePage={activePage}
                totalCount={totalRows}
                itemsCountPerPage={itemsCountPerPage}
              />
            </div>
          }
        </div>
      )
    } else {
      return (
        <LoadingAnimation name="ball-clip-rotate" color="black" />
      )
    }
  }
  onSearchFilterChange(event) {
    const {
      activePage,
      sort
    } = this.state;
    const searchFilter = event.target.value.trim().toLowerCase();

    this.setState({searchFilter: searchFilter});

    ::this.handleDataRowsChange(searchFilter, sort.column, sort.direction, activePage);
  }
  handleSortTable(column) {
    const { rows } = this.props;
    const {
      activePage,
      searchFilter,
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

    ::this.handleDataRowsChange(searchFilter, column, direction, activePage);
  }
  handleChangePage(page) {
    const {
      searchFilter,
      sort
    } = this.state;

    this.setState({activePage: page});

    ::this.handleDataRowsChange(searchFilter, sort.column, sort.direction, page);
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
