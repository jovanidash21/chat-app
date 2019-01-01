import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const NotFound = (props) => {
  return (
    <div className="not-found">
      <h2 className="title">404</h2>
      <div className="content">
        <p>Oops! Something is wrong.</p>
        <p>Page not found.</p>
      </div>
      <a href="/" className="mui-btn mui-btn--raised mui-btn--large button button-secondary">
        Go to chat page
      </a>
    </div>
  );
}

export default NotFound;
