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

    const {
      value,
      handleClearSearchFilter,
    } = this.props;

    if ( value.length > 0 ) {
      handleClearSearchFilter();
    }

    this.inputFilter.controlEl.focus();
  }
  render() {
    const {
      value,
      placeholder,
      onChange,
      onKeyDown,
      light,
    } = this.props;

    return (
      <div
        className={
          "search-filter " +
          (value.length > 0 ? 'show-clear-icon ' : '') +
          (light ? 'light' : '')
        }
      >
        <div className="search-icon">
          <FontAwesomeIcon icon="search" />
        </div>
        <Input
          value={value}
          type="text"
          autoComplete="off"
          floatingLabel={false}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={(element) => { this.inputFilter = element; }}
        />
        <div className="clear-icon" onClick={::this.handleClearSearchFilter}>
          <FontAwesomeIcon icon="times" />
        </div>
      </div>
    );
  }
}

SearchFilter.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  handleClearSearchFilter: PropTypes.func.isRequired,
  light: PropTypes.bool,
}

SearchFilter.defaultProps = {
  value: '',
  placeholder: 'Search',
  onChange: () => {},
  onKeyDown: () => {},
  light: false,
}

export default SearchFilter;
