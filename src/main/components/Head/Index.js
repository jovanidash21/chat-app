import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

const Head = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
    </Helmet>
  );
}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string
}

Head.defaultProps = {
  description: '',
  keywords: ''
}

export default Head;
