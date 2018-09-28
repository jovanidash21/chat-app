import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'muicss/react';
import './styles.scss';

class SearchFilter extends Component {
  constructor(props) {
    super(props);
  }
  handleClearSearchFilter(event) {
    event.preventDefault();

    const { handleClearSearchFilter } = this.props;

    handleClearSearchFilter();

    this.inputFilter.controlEl.focus();
  }
  render() {
    const {
      value,
      onSearchFilterChange,
      placeholder
    } = this.props;

    return (
      <div className="search-filter">
        <div className="search-icon">
          <FontAwesomeIcon icon="search" />
        </div>
        <Input
          value={value}
          type="text"
          autoComplete="off"
          floatingLabel={false}
          placeholder={placeholder}
          onChange={onSearchFilterChange}
          ref={(element) => { this.inputFilter = element; }}
        />
        {
          value.length > 0 &&
          <div className="clear-icon" onClick={::this.handleClearSearchFilter}>
            <FontAwesomeIcon icon="times" />
          </div>
        }
      </div>
    );
  }
}

SearchFilter.propTypes = {
  value: PropTypes.string,
  onSearchFilterChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  handleClearSearchFilter: PropTypes.func.isRequired
}

SearchFilter.defaultProps = {
  value: '',
  placeholder: 'Search'
}

export default SearchFilter;
