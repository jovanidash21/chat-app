import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'muicss/react';
import mapDispatchToProps from '../../actions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="dahsboard-section">
        <Panel>
          Dashboard
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
