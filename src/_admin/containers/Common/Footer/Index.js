import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-copyright">
        Copyright
        <div className="copyright-icon">
          <FontAwesomeIcon icon={["far", "copyright"]} />
        </div>
        2018 Chat App.
      </div>
    </footer>
  );
}

export default Footer;
