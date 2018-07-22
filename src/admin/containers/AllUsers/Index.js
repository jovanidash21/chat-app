import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'muicss/react';
import mapDispatchToProps from '../../actions';
import Table from '../Partial/Table';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'accountType', label: 'Account Type' },
  { key: 'role', label: 'Role' },
];

class AllUsers extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { fetchUsers } = this.props;

    fetchUsers();
  }
  handleTableRender() {

  }
  render() {
    const { user } = this.props;

    return (
      <div className="all-users-section">
        <Panel>
          <Table
            columns={columns}
            rows={user.all}
          />
        </Panel>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers);
