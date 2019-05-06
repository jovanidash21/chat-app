import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'muicss/react';
import { Modal } from '../../Modal';
import { Skeleton } from '../../Skeleton';
import { Avatar } from '../../Avatar';
import './styles.scss';

class BlockedUsersListModal extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.handleFetchBlockedUsers();
  }
  render() {
    const {
      blockedUsers,
      blockedUserFetch,
      open,
      onClose,
    } = this.props;
    const loading = blockedUserFetch.loading;

    return (
      <Modal
        className="blocked-users-list-modal"
        open={open}
        onClose={onClose}
      >
        <Modal.Header>
          <h3 className="modal-title">Blocked Users</h3>
        </Modal.Header>
        <Modal.Body>
          {
            loading &&
            <Fragment>
              {
                Array.from(Array(2).keys()).map((i) =>
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
