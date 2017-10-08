import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";

class Head extends Component {
  render () {
    const { 
      title,
      description,
      keywords
    } = this.props;

    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    );
  }
};

Head.propTypes={
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string
}

export default Head;