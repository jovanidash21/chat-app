import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './styles.scss';

const CardBanner = (props) => {
  const cardBannerComponent = (
    <div className={"card-banner " + props.color}>
      <div className="card-icon">
        {
          props.icon.length > 0 &&
          <FontAwesomeIcon icon={props.icon} size="4x" />
        }
      </div>
      <div className="card-content">
        <div className="count">
          {!props.loading ? props.count : '-'}
        </div>
        <div className="label">
          {props.label}
        </div>
      </div>
    </div>
  );

  if ( props.link.length > 0 ) {
    return (
      <Link to={props.link}>
        {cardBannerComponent}
      </Link>
    )
  } else {
    return (
      <Fragment>
        {cardBannerComponent}
      </Fragment>
    )
  }
}

CardBanner.propTypes = {
  label: PropTypes.string,
  count: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string,
  loading: PropTypes.bool,
}

CardBanner.defaultProps = {
  label: '',
  count: '',
  icon: '',
  color: 'black',
  link : '',
  loading: false,
}

export default CardBanner;
