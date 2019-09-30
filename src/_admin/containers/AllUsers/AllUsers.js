import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import {
  Table,
  DeleteUserModal
} from '../Partial';
import { MenuButton } from '../../components/MenuButton';
import { Alert } from '../../../components/Alert';
import { Avatar } from '../../../components/Avatar';

class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      deleteModalOpen: false,
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
    if (
      (prevProps.user.fetchAll.loading && !this.props.user.fetchAll.loading) ||
      (prevProps.user.delete.loading && !this.props.user.delete.loading)
    ) {
      ::this.handleUserRows();
    }
  }
  handleUserRows() {
    const { user } = this.props;
    const userRows = [];

    for (let i = 0; i < user.all.length; i += 1) {
      const singleUser = user.all[i];
      const image = (<Avatar
          image={singleUser.profilePicture}
          size="32px"
          name={singleUser.name}
          roleChatType={singleUser.role}
          accountType={singleUser.accountType}
          badgeCloser
        />);

      userRows.push({
        _id: singleUser._id,
        image: image,
        name: singleUser.name,
        email: singleUser.email,
        accountType: singleUser.accountType,
        role: singleUser.role,
        isEditable: true,
      });
    }

    this.setState({
      loading: false,
      rows: userRows
    });
  }
  handleOpenDeleteModal(selecedtUserID) {
    const { fetchSelectedUser } = this.props;

    this.setState({deleteModalOpen: true});

    fetchSelectedUser(selecedtUserID);
  }
  handleCloseDeleteModal() {
    this.setState({deleteModalOpen: false});
  }
  render() {
    const { user } = this.props;
    const {
      loading,
      columns,
      rows,
      deleteModalOpen,
    } = this.state;
    const label = {
      singular: 'user',
      plural: 'users',
    };
    const modal = (<DeleteUserModal
        open={deleteModalOpen}
        onClose={::this.handleCloseDeleteModal}
      />);

    return (
      <div className="all-users-section">
        <Container fluid>
          <Row>
            <Col xs="12">
              <div className="admin-menu-section">
                <MenuButton label="Create New" link="/create-user" />
              </div>
            </Col>
            <Col xs="12">
              {
                user.delete.success &&
                <Alert label={user.delete.message} type="success" />
              }
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Table
                label={label}
                columns={columns}
                rows={rows}
                loading={loading}
                editLink="/edit-user"
                deleteModal={modal}
                deleteModalOpen={deleteModalOpen}
                handleOpenDeleteModal={::this.handleOpenDeleteModal}
                handleCloseDeleteModal={::this.handleCloseDeleteModal}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllUsers);
