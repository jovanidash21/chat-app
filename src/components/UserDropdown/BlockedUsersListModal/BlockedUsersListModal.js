import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'muicss/react';
import { Modal } from '../../Modal';
import { Skeleton } from '../../Skeleton';
import { SearchFilter } from '../../SearchFilter';
import { Avatar } from '../../Avatar';
import { UnblockAllUsersModal } from './UnblockAllUsersModal';
import './styles.scss';

class BlockedUsersListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockedUsers: [],
      searchFilter: '',
      unblockAllUsersModalOpen: false,
    }
  }
  componentWillMount() {
    this.props.handleFetchBlockedUsers();
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.blockedUserFetch.loading && ! this.props.blockedUserFetch.loading ) {
      ::this.handleBlockedUsersListFilter();
    }
  }
  handleBlockedUsersListFilter(searchFilter = '') {
    const { blockedUsers } = this.props;
    let allBlockedUsers = [...blockedUsers];

    if ( searchFilter.length > 0 ) {
      allBlockedUsers = allBlockedUsers.filter((blockedUser) => {
        return blockedUser.name && blockedUser.name.toLowerCase().match(searchFilter.toLowerCase());
      });
    } else {
      allBlockedUsers = [...blockedUsers];
    }

    this.setState({blockedUsers: allBlockedUsers});
  }
  handleClearSearchFilter() {
    this.setState({searchFilter: ''});
    ::this.handleBlockedUsersListFilter();
  }
  onSearchFilterChange(event) {
    const searchFilter = event.target.value;

    this.setState({searchFilter: searchFilter});

    ::this.handleBlockedUsersListFilter(searchFilter);
  }
  handleOpenUnblockAllUsersModal(event) {
    event.preventDefault();

    this.setState({unblockAllUsersModalOpen: true});
  }
  handleCloseUnblockAllUsersModal() {
    this.setState({unblockAllUsersModalOpen: false});
  }
  handleBlockUnblockUser(event, selectedUser) {
    event.preventDefault();

    const { handleBlockUnblockUser } = this.props;

    handleBlockUnblockUser(selectedUser);
  }
  render() {
    const {
      blockedUsers: allBlockedUsers,
      blockedUserFetch,
      handleUnblockAllUsers,
      blockedUserUnblockAll,
      blockedUserBlock,
      blockedUserUnblock,
      open,
      onClose,
    } = this.props;
    const {
      blockedUsers,
      searchFilter,
      unblockAllUsersModalOpen,
    } = this.state;
    const loading = blockedUserFetch.loading;
    const disabled = blockedUserBlock.loading || blockedUserUnblock.loading;

    return (
      <Fragment>
        <Modal
          className="blocked-users-list-modal"
          open={open}
          onClose={onClose}
          center={false}
        >
          <Modal.Header>
            <h3 className="modal-title">Blocked Users</h3>
          </Modal.Header>
          <Modal.Body>
            {
              ( loading || ! loading && allBlockedUsers.length > 0 ) &&
              <div className="list-header">
                {
                  loading
                    ?
                    <Fragment>
                      <div className="search-filter">
                        <Skeleton
                          height="37px"
                          width="241px"
                        />
                      </div>
                      <Skeleton
                        height="31px"
                        width="120px"
                      />
                    </Fragment>
                    :
                    <Fragment>
                      {
                        allBlockedUsers.length > 0 &&
                        <Fragment>
                          <SearchFilter
                            value={searchFilter}
                            onChange={::this.onSearchFilterChange}
                            handleClearSearchFilter={::this.handleClearSearchFilter}
                          />
                          {
                            <Button
                              className="button button-danger"
                              size="small"
                              onClick={::this.handleOpenUnblockAllUsersModal}
                              disabled={disabled}
                            >
                              Unblock All
                            </Button>
                          }
                        </Fragment>
                      }
                    </Fragment>
                }
              </div>
            }
            {
              loading &&
              <Fragment>
                {
                  Array.from(Array(5).keys()).map((i) =>
                    <div key={i} className="blocked-user">
                      <Skeleton
                        className="avatar"
                        height="40px"
                        width="40px"
                        circle
                      />
                      <div className="user-name">
                        <Skeleton
                          height="22px"
                          width={(i === 0 ? '110px' : '80px')}
                        />
                      </div>
                      <Skeleton
                        height="31px"
                        width="93px"
                      />
                    </div>
                  )
                }
              </Fragment>
            }
            {
              ! loading &&
              blockedUsers.length > 0 &&
              blockedUsers.map((blockedUser, i) =>
                <div key={i} className="blocked-user">
                  <Avatar
                    image={blockedUser.profilePicture}
                    size="40px"
                    name={blockedUser.name}
                    username={blockedUser.username}
                    roleChatType={blockedUser.role}
                    accountType={blockedUser.accountType}
                    badgeCloser
                  />
                  <div className="user-name">
                    {blockedUser.name}
                  </div>
                  <Button
                    className={"button button-" + (blockedUser.blocked ? 'default' : 'primary')}
                    size="small"
                    onClick={(e) => {::this.handleBlockUnblockUser(e, blockedUser)}}
                    disabled={disabled}
                  >
                    {blockedUser.blocked ? 'Unblock' : 'Block'}
                  </Button>
                </div>
              )
            }
            {
              ! loading &&
              blockedUsers.length === 0 &&
              <div className="no-results">
                No {searchFilter.length > 0 ? 'results found' : 'blocked users'}
              </div>
            }
          </Modal.Body>
        </Modal>
        {
          unblockAllUsersModalOpen &&
          <UnblockAllUsersModal
            handleUnblockAllUsers={handleUnblockAllUsers}
            blockedUserUnblockAll={blockedUserUnblockAll}
            open={unblockAllUsersModalOpen}
            onClose={::this.handleCloseUnblockAllUsersModal}
          />
        }
      </Fragment>
    )
  }
}

BlockedUsersListModal.propTypes = {
  handleFetchBlockedUsers: PropTypes.func.isRequired,
  blockedUsers: PropTypes.array,
  blockedUserFetch: PropTypes.object.isRequired,
  handleUnblockAllUsers: PropTypes.func.isRequired,
  blockedUserUnblockAll: PropTypes.object.isRequired,
  handleBlockUnblockUser: PropTypes.func.isRequired,
  blockedUserBlock: PropTypes.object.isRequired,
  blockedUserUnblock: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

BlockedUsersListModal.defaultProps = {
  blockedUsers: [],
  loading: false,
  open: false,
}

export default BlockedUsersListModal;
