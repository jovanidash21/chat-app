import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'muicss/react';
import mapDispatchToProps from '../../actions';
import Table from '../Partial/Table';

class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      columns: [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'accountType', label: 'Account Type' },
        { key: 'role', label: 'Role' }
      ],
      rows: []
    };
  }
  componentWillMount() {
    const { fetchUsers } = this.props;

    fetchUsers();
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.user.isFetchingAll && !this.props.user.isFetchingAll ) {
      ::this.handleUserRows();
    }
  }
  handleUserRows() {
    const { user } = this.props;
    const userRows = [];

    for ( var i = 0; i < user.all.length; i++ ) {
      const singleUser = user.all[i];

      userRows.push({
        image: singleUser.profilePicture,
        name: singleUser.name,
        email: singleUser.email,
        accountType: singleUser.accountType,
        role: singleUser.role
      });
    }

    this.setState({
      isLoading: false,
      rows: userRows
    });
  }
  render() {
    const {
      isLoading,
      columns,
      rows
    } = this.state;

    return (
      <div className="all-users-section">
        <Panel>
          <Table
            columns={columns}
            rows={rows}
            isLoading={isLoading}
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
