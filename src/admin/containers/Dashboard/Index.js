import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Panel } from 'muicss/react';
import Popup from 'react-popup';
import mapDispatchToProps from '../../actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="dahsboard-section">
        <Panel>
          <h2>Dashboard</h2>
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
