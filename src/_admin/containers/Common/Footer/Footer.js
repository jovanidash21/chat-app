import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import './styles.scss';

const Footer = (props) => {
  const year = moment().format('YYYY');

  return (
    <footer className="footer">
      <div className="footer-copyright">
        Copyright
        <div className="copyright-icon">
          <FontAwesomeIcon icon={["far", "copyright"]} />
        </div>
        {year} Chat App.
      </div>
    </footer>
  );
}

export default Footer;
