import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'muicss/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfPages: 0,
    };
  }
  componentWillMount() {
    ::this.handleNumberOfPages();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.totalCount !== this.props.totalCount) {
      ::this.handleNumberOfPages();
    }
  }
  handleNumberOfPages() {
    const {
      totalCount,
      itemsCountPerPage,
    } = this.props;
    const numberOfPages = Math.ceil(totalCount / itemsCountPerPage);

    this.setState({numberOfPages: numberOfPages});
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
      itemsCountPerPage,
    } = this.props;
    const { numberOfPages } = this.state;
    const pageNumbers = [];
    const pageNumbersWithDots = [];
    const delta = 1;
    const left = activePage - delta;
    const right = activePage + delta + 1;
    let j;

    for (let i = 1; i <= numberOfPages; i += 1) {
      if (i == 1 || i == numberOfPages || i >= left && i < right) {
        pageNumbers.push(i);
      }
    }

    for (let i of pageNumbers) {
      if (j)  {
        if  (i - j === 2) {
          pageNumbersWithDots.push(j + 1);
        } else if (i - j !== 1) {
          pageNumbersWithDots.push('...');
        }
      }
      pageNumbersWithDots.push(i);
      j = i;
    }

    return (
      pageNumbersWithDots.map((number, i) =>
        <li key={i}>
          <Button
            className={
              "pagination-button " +
              (number === activePage ? 'active ' : '') +
              (number === '...' ? 'ellipsis-button' : '')
            }
            variant="flat"
            size="small"
            onClick={number !== '...' ? (e) => ::this.handleChangePage(e, number) : () => {}}
            disabled={number === '...'}
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
      itemsCountPerPage,
    } = this.props;
    const { numberOfPages } = this.state;
    const isPrevButtonDisabled = activePage === 1;
    const isNextButtonDisabled = activePage === numberOfPages;

    return (
      <ul className="pagination-buttons">
        <li>
          <Button
            className="pagination-button arrow-button"
            variant="flat"
            size="small"
            onClick={!isPrevButtonDisabled ? (e) => ::this.handleChangePage(e, 1) : () => {}}
            title="First Page"
            disabled={isPrevButtonDisabled}
          >
            <FontAwesomeIcon icon="angle-double-left" />
          </Button>
        </li>
        <li>
          <Button
            className="pagination-button arrow-button"
            variant="flat"
            size="small"
            onClick={!isPrevButtonDisabled ? (e) => ::this.handleChangePage(e, activePage - 1) : () => {}}
            title="Previous Page"
            disabled={isPrevButtonDisabled}
          >
            <FontAwesomeIcon icon="angle-left" />
          </Button>
        </li>
        {::this.handlePaginationRender()}
        <li>
          <Button
            className="pagination-button arrow-button"
            variant="flat"
            size="small"
            onClick={!isNextButtonDisabled ? (e) => ::this.handleChangePage(e, activePage + 1) : () => {}}
            title="Next Page"
            disabled={isNextButtonDisabled}
          >
            <FontAwesomeIcon icon="angle-right" />
          </Button>
        </li>
        <li>
          <Button
            className="pagination-button arrow-button"
            variant="flat"
            size="small"
            onClick={!isNextButtonDisabled ? (e) => ::this.handleChangePage(e, numberOfPages) : () => {}}
            title="Last Page"
            disabled={isNextButtonDisabled}
          >
            <FontAwesomeIcon icon="angle-double-right" />
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
  itemsCountPerPage: PropTypes.number.isRequired,
}

export default Pagination;
