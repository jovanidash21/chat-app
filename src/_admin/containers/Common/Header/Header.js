import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appbar } from 'muicss/react/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { isObjectEmpty } from '../../../../utils/object';
import { Skeleton } from '../../../../components/Skeleton';
import { UserDropdown } from '../../../../components/UserDropdown';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editProfileModalOpen: false
    }
  }
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleLeftSideDrawerToggleEvent } = this.props;

    handleLeftSideDrawerToggleEvent(true);
  }
  handleOpenEditProfileModal() {
    this.setState({editProfileModalOpen: true});
  }
  handleCloseEditProfileModal() {
    this.setState({editProfileModalOpen: false});
  }
  handleEditProfile(username, name, email, profilePicture) {
    const {
      user,
      editActiveUser,
    } = this.props;
    const activeUser = user.active;

    if ( activeUser.accountType === 'local' ) {
      editActiveUser(activeUser._id, username, name, email, profilePicture);
    }
  }
  render() {
    const {
      user,
      upload,
      uploadImage,
      children,
    } = this.props;
    const { editProfileModalOpen } = this.state;
    const activeUser = user.active;
    const activeUserEmpty = isObjectEmpty( activeUser );
    const loading = user.fetchActive.loading;

    return (
      <Appbar className="header">
        <div
          className="hamburger-icon"
          onClick={::this.handleLeftSideDrawerToggleEvent}
        >
          <FontAwesomeIcon icon="bars" size="2x" />
        </div>
        <div className="content">
          {children}
        </div>
        {
          loading &&
          <div className="user-dropdown">
            <div className="dropdown-toggle">
              <Skeleton
                className="avatar"
                height="32px"
                width="32px"
                circle
              />
              <div className="arrow-down-icon">
                <FontAwesomeIcon icon="caret-down" />
              </div>
            </div>
          </div>
        }
        {
          ! loading &&
          ! activeUserEmpty &&
          <UserDropdown
            user={activeUser}
            handleOpenEditProfileModal={::this.handleOpenEditProfileModal}
          >
            {
              editProfileModalOpen &&
              <UserDropdown.EditProfileModal
                user={activeUser}
                upload={upload}
                handleImageUpload={uploadImage}
                handleEditProfile={::this.handleEditProfile}
                userEdit={user.editActive}
                open={editProfileModalOpen}
                onClose={::this.handleCloseEditProfileModal}
              />
            }
          </UserDropdown>
        }
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    upload: state.upload,
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
