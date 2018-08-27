import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button
} from 'muicss/react';
import { Link } from 'react-router-dom';
import mapDispatchToProps from '../../actions';
import {
  Table,
  DeleteUserModal
} from '../Partial';
import { Avatar } from '../../../components/Avatar';

class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isModalOpen: false,
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
      ( prevProps.user.isFetchingAll && !this.props.user.isFetchingAll ) ||
      ( prevProps.user.isDeleting && !this.props.user.isDeleting )
    ) {
      ::this.handleUserRows();
    }
  }
  handleUserRows() {
    const { user } = this.props;
    const userRows = [];

    for ( var i = 0; i < user.all.length; i++ ) {
      const singleUser = user.all[i];
      const image = (<Avatar
          image={singleUser.profilePicture}
          size="32px"
          title={singleUser.name}
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
        isEditable: true
      });
    }

    this.setState({
      isLoading: false,
      rows: userRows
    });
  }
  handleOpenModal(selecedtUserID) {
    const { fetchSelectedUser } = this.props;

    this.setState({isModalOpen: true});

    fetchSelectedUser(selecedtUserID);
  }
  handleCloseModal() {
    this.setState({isModalOpen: false});
  }
  render() {
    const {
      isLoading,
      columns,
      rows,
      isModalOpen
    } = this.state;
    const label = {
      singular: 'user',
      plural: 'users'
    };
    const modal = (<DeleteUserModal
        isModalOpen={isModalOpen}
        handleCloseModal={::this.handleCloseModal}
      />);

    return (
      <div className="all-users-section">
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              <div className="admin-menu-section">
                <Link to="/create-user" className="mui-btn mui-btn--large button button-default">
                  Create New
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Table
                label={label}
                columns={columns}
                rows={rows}
                isLoading={isLoading}
                editLink="/edit-user"
                deleteModal={modal}
                isDeleteModalOpen={isModalOpen}
                handleOpenDeleteModal={::this.handleOpenModal}
                handleCloseDeleteModal={::this.handleCloseModal}
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
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers);
