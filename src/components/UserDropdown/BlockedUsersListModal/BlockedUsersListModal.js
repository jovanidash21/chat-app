import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'muicss/react';
import { Modal } from '../../Modal';
import { Skeleton } from '../../Skeleton';
import { SearchFilter } from '../../SearchFilter';
import { Avatar } from '../../Avatar';
import './styles.scss';

class BlockedUsersListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blockedUsers: [],
      searchFilter: '',
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
        return blockedUser.name.toLowerCase().match(searchFilter.toLowerCase());
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
  render() {
    const {
      blockedUserFetch,
      open,
      onClose,
    } = this.props;
    const {
      blockedUsers,
      searchFilter,
    } = this.state;
    const loading = blockedUserFetch.loading;

    return (
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
                  <SearchFilter
                    value={searchFilter}
                    onChange={::this.onSearchFilterChange}
                    handleClearSearchFilter={::this.handleClearSearchFilter}
                  />
                  <Button className="button button-danger" size="small">
                    Unblock All
                  </Button>
                </Fragment>
            }
          </div>
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
                <Button className="button button-primary" size="small">
                  Unblock
                </Button>
              </div>
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

BlockedUsersListModal.propTypes = {
  handleFetchBlockedUsers: PropTypes.func.isRequired,
  blockedUsers: PropTypes.array,
  blockedUserFetch: PropTypes.object.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

BlockedUsersListModal.defaultProps = {
  blockedUsers: [],
  loading: false,
  open: false,
}

export default BlockedUsersListModal;
