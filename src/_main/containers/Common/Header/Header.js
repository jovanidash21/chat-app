import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appbar } from 'muicss/react/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../../actions';
import { MuteChatRoomModal } from '../../Partial';
import { ChatRoomDropdown } from '../../../components/Header';
import { UserDropdown } from '../../../../components/UserDropdown';
import './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }
  }
  handleLeftSideDrawerToggleEvent(event) {
    event.preventDefault();

    const { handleLeftSideDrawerToggleEvent } = this.props;

    handleLeftSideDrawerToggleEvent(true);
  }
  handleOpenModal() {
    this.setState({isModalOpen: true});
  }
  handleCloseModal() {
    this.setState({isModalOpen: false});
  }
  render() {
    const {
      user,
      chatRoom,
      children
    } = this.props;
    const { isModalOpen } = this.state;

    return (
      <Appbar className="header">
        <table width="100%">
          <tbody>
            <tr style={{verticalAlign: 'middle'}}>
              <td className="mui--appbar-height">
                <div className="left-part-header">
                  <div
                    className="hamburger-icon"
                    onClick={::this.handleLeftSideDrawerToggleEvent}
                  >
                    <FontAwesomeIcon icon="bars" size="2x" />
                  </div>
                  {children}
                </div>
              </td>
              <td className="mui--appbar-height mui--text-right">
                {
                  !chatRoom.fetch.loading &&
                  chatRoom.fetch.success &&
                  Object.keys(chatRoom.active.data).length > 0 &&
                  <ChatRoomDropdown
                    activeChatRoom={chatRoom.active}
                    handleOpenMuteModal={::this.handleOpenModal}
                  />
                }
                <UserDropdown user={user.active} />
              </td>
            </tr>
          </tbody>
        </table>
        {
          isModalOpen &&
          <MuteChatRoomModal
            isModalOpen={isModalOpen}
            handleCloseModal={::this.handleCloseModal}
          />
        }
      </Appbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatRoom: state.chatRoom
  }
}

Header.propTypes = {
  handleLeftSideDrawerToggleEvent: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
