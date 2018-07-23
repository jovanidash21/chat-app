import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import './styles.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  handleChangePage(event, page) {
    event.preventDefault();

    const { handleChangePage } = this.props;

    handleChangePage(page);
  }
  handlePaginationRender() {
    const {
      activePage,
      totalCount,
      itemsCountPerPage
    } = this.props;
    const pageNumbers = [];

    for ( var i = 1; i <= Math.ceil(totalCount / itemsCountPerPage); i++ ) {
      pageNumbers.push(i);
    }

    return (
      pageNumbers.map((number, i) =>
        <li key={i}>
          <Button
            className={"pagination-button " + (number === activePage ? 'active' : '')}
            variant="flat"
            size="small"
            onClick={(e) => ::this.handleChangePage(e, number)}
          >
            {number}
          </Button>
        </li>
      )
    )
  }
  render() {
    const {
      activePage,
      totalCount,
      itemsCountPerPage
    } = this.props;
    const isPrevButtonDisabled = activePage === 1;
    const isNextButtonDisabled = activePage === Math.ceil(totalCount / itemsCountPerPage);

    return (
      <ul className="pagination-buttons">
        <li>
          <Button
            className="pagination-button"
            variant="flat"
            size="small"
            onClick={!isPrevButtonDisabled ? (e) => ::this.handleChangePage(e, activePage - 1) : false}
            disabled={isPrevButtonDisabled}
          >
            Prev
          </Button>
        </li>
        {::this.handlePaginationRender()}
        <li>
          <Button
            className="pagination-button"
            variant="flat"
            size="small"
            onClick={!isNextButtonDisabled ? (e) => ::this.handleChangePage(e, activePage + 1) : false}
            disabled={isNextButtonDisabled}
          >
            Next
          </Button>
        </li>
      </ul>
    )
  }
}

Pagination.propTypes = {
  handleChangePage:  PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired
}

export default Pagination;
