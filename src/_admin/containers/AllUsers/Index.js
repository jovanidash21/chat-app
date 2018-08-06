import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Panel
} from 'muicss/react';
import mapDispatchToProps from '../../actions';
import Table from '../Partial/Table';
import DeleteUserModal from '../Partial/DeleteUserModal';

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

      userRows.push({
        id: singleUser._id,
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
  handleOpenModal(selecedtUser) {
    const { selectUser } = this.props;

    this.setState({isModalOpen: true});

    selectUser(selecedtUser);
  }
  handleCloseModal() {
    const { deselectUser } = this.props;

    this.setState({isModalOpen: false});

    deselectUser();
  }
  render() {
    const {
      isLoading,
      columns,
      rows,
      isModalOpen
    } = this.state;
    const modal = (<DeleteUserModal
        isModalOpen={isModalOpen}
        handleCloseModal={::this.handleCloseModal}
      />);

    return (
      <div className="all-users-section">
        <Container>
          <Row>
            <Col xs="12">
              <Panel>
                <Table
                  label="users"
                  columns={columns}
                  rows={rows}
                  isLoading={isLoading}
                  modal={modal}
                  isModalOpen={isModalOpen}
                  handleOpenModal={::this.handleOpenModal}
                  handleCloseModal={::this.handleCloseModal}
                />
              </Panel>
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
