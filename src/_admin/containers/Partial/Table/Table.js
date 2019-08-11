import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Panel,
  Button,
} from 'muicss/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { SearchFilter } from '../../../../components/SearchFilter';
import { Skeleton } from '../../../../components/Skeleton';
import {
  TableColumn,
  Pagination,
} from '../../../components/Table';
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
        direction: 'asc',
      },
      dataRows: [],
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.loading && !this.props.loading ) {
      ::this.handleSortTable(this.props.columns[0].key);
    }

    if ( ! prevProps.loading && prevProps.rows.length !== this.props.rows.length ) {
      const {
        activePage,
        searchFilter,
        sort,
      } = this.state;

      ::this.handleDataRowsChange(searchFilter, sort.column, sort.direction, activePage);
    }
  }
  handleDataRowsChange(filter, column, direction, page) {
    const {
      columns,
      rows,
    } = this.props;
    const { itemsCountPerPage } = this.state;
    let dataRows = [...rows];

    if ( filter.length > 0 ) {
      const filteredData = [];

      for ( let i = 0; i < dataRows.length; i += 1 ) {
        const singleDataRow = dataRows[i];

        for ( let key in singleDataRow ) {
          if (
            columns.some((singleColumn) => singleColumn.key === key) &&
            singleDataRow[key] &&
            singleDataRow[key].length > 0 &&
            singleDataRow[key].toLowerCase().match(filter)
          ) {
            filteredData.push(singleDataRow);
            break;
          }
        }
      }

      dataRows = filteredData;
      page = 1;
    }

    const lastItemIndex = page * itemsCountPerPage;
    const firstItemIndex = lastItemIndex - itemsCountPerPage;

    this.setState({totalRows: dataRows.length});

    dataRows = dataRows.sort((a, b) => {
      a[column] = a[column] || '';
      b[column] = b[column] || '';

      return a[column].toString().toLowerCase().localeCompare(b[column].toString().toLowerCase());
    });

    if ( direction === 'desc' ) {
      dataRows.reverse();
    }

    dataRows = dataRows.slice(firstItemIndex, lastItemIndex);

    this.setState({dataRows: dataRows});
  }
  onSearchFilterChange(event) {
    const {
      activePage,
      sort,
    } = this.state;
    const searchFilter = event.target.value.trim().toLowerCase();

    this.setState({searchFilter: searchFilter});

    ::this.handleDataRowsChange(searchFilter, sort.column, sort.direction, activePage);
  }
  handleClearSearchFilter() {
    const {
      activePage,
      sort,
    } = this.state;
    const searchFilter = '';

    this.setState({searchFilter: searchFilter});

    ::this.handleDataRowsChange(searchFilter, sort.column, sort.direction, activePage);
  }
  handleSortTable(column) {
    const { rows } = this.props;
    const {
      activePage,
      searchFilter,
      sort,
    } = this.state;
    let direction = 'desc';

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
        direction,
      }
    });

    ::this.handleDataRowsChange(searchFilter, column, direction, activePage);
  }
  handleChangePage(page) {
    const {
      searchFilter,
      sort,
    } = this.state;

    this.setState({activePage: page});

    ::this.handleDataRowsChange(searchFilter, sort.column, sort.direction, page);
  }
  handleOpenDeleteModal(event, selecedtRow) {
    event.preventDefault();

    const { handleOpenDeleteModal } = this.props;

    handleOpenDeleteModal(selecedtRow);
  }
  handleCloseDeleteModal() {
    const { handleCloseDeleteModal } = this.props;

    handleCloseDeleteModal();
  }
  render() {
    const {
      label,
      columns,
      rows,
      loading,
      editLink,
      deleteModal,
      deleteModalOpen,
    } = this.props;
    const {
      totalRows,
      activePage,
      itemsCountPerPage,
      searchFilter,
      sort,
      dataRows,
    } = this.state;
    const capitalizeSingularLabel = label.singular.charAt(0).toUpperCase() + label.singular.slice(1);
    const capitalizePluralLabel = label.plural.charAt(0).toUpperCase() + label.plural.slice(1);

    return (
      <Panel>
        <div className="table-wrapper">
          <div className="search-filter-wrapper">
            {
              loading
                ?
                <div className="search-filter">
                  <Skeleton
                    height="37px"
                    width="245px"
                  />
                </div>
                :
                <SearchFilter
                  value={searchFilter}
                  placeholder={"Search " + capitalizePluralLabel}
                  onChange={::this.onSearchFilterChange}
                  handleClearSearchFilter={::this.handleClearSearchFilter}
                />
            }
          </div>
          <div className="table">
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
                        sortActive={sort.column === singleColumn.key}
                        sortOrder={sort.direction}
                        handleSortTable={::this.handleSortTable}
                        disabled={loading}
                      />
                    )
                  }
                  <th className="actions-column">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  loading &&
                  columns.length > 0 &&
                  <Fragment>
                    {
                      Array.from(Array(10).keys()).map((i) =>
                        <tr key={i} className="table-row">
                          {
                            columns.map((singleColumn, i) =>
                              <td key={i}>
                                <div className="table-data">
                                  {
                                    i === 0 &&
                                    <div className="row-image">
                                      <Skeleton
                                        className="avatar"
                                        height="32px"
                                        width="32px"
                                        circle
                                      />
                                    </div>
                                  }
                                  <span>
                                    <Skeleton
                                      height="20px"
                                      width="100px"
                                    />
                                  </span>
                                </div>
                              </td>
                            )
                          }
                          <td>
                            <div className="data-actions">
                              {
                                Array.from(Array(2).keys()).map((i) =>
                                  <Skeleton
                                    key={i}
                                    className="mui-btn mui-btn--small"
                                    height="31px"
                                    width="44px"
                                  />
                                )
                              }
                            </div>
                          </td>
                        </tr>
                      )
                    }
                  </Fragment>
                }
                {
                  ! loading &&
                  columns.length > 0 &&
                  dataRows.length > 0 &&
                  dataRows.map((singleRow, i) =>
                    <tr key={i} className="table-row">
                      {
                        columns.map((singleColumn, i) =>
                          <td key={i}>
                            <div className="table-data">
                              {
                                i === 0 &&
                                <div className="row-image">
                                  {singleRow.image}
                                </div>
                              }
                              <span>
                                {singleRow[singleColumn.key]}
                              </span>
                            </div>
                          </td>
                        )
                      }
                      <td>
                        <div className="data-actions">
                          {
                            editLink.length > 0 &&
                            singleRow.isEditable &&
                            <Link
                              to={editLink + "/" + singleRow._id}
                              className="mui-btn mui-btn--small button button-primary"
                              title={"Edit " + capitalizeSingularLabel}
                            >
                              <FontAwesomeIcon icon={["far", "edit"]} />
                            </Link>
                          }
                          <Button
                            className="button button-danger"
                            size="small"
                            title={"Delete " + capitalizeSingularLabel}
                            onClick={(e) => {::this.handleOpenDeleteModal(e, singleRow)}}
                          >
                            <FontAwesomeIcon icon={["far", "trash-alt"]} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                }
                {
                  ! loading &&
                  searchFilter.length > 0 &&
                  dataRows.length === 0 &&
                  <tr className="no-items-row">
                    <td colSpan={columns.length + 2}>
                      No {label.plural} found
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          {
            loading &&
            <div className="pagination-wrapper">
              <Skeleton
                className="mui-btn mui-btn--small"
                height="31px"
                width="250px"
              />
            </div>
          }
          {
            ! loading &&
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
        {
          deleteModalOpen &&
          deleteModal
        }
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

Table.propTypes = {
  label: PropTypes.object,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  editLink: PropTypes.string,
  deleteModal: PropTypes.element,
  deleteModalOpen: PropTypes.bool,
  handleOpenDeleteModal: PropTypes.func,
  handleCloseDeleteModal: PropTypes.func,
}

Table.defaultProps = {
  label: {
    singular: 'item',
    plural: 'items'
  },
  loading: false,
  editLink: '',
  deleteModal: React.createElement('div'),
  deleteModalOpen: false,
  handleOpenDeleteModal: () => {},
  handleCloseDeleteModal: () => {},
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
