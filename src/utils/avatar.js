/**
 * Handle chat room avatar badges
 * @param {Object} chatRoom
 * @param {Object} user
 * @param {string} type
 */
export function handleChatRoomAvatarBadges(chatRoom={}, user={}, type="account") {
  const isChatRoomEmpty = Object.keys(chatRoom).length === 0 && chatRoom.constructor === Object;
  const isUserEmpty = Object.keys(user).length === 0 && user.constructor === Object;

  if ( isChatRoomEmpty && isUserEmpty  ) {
    return '';
  }

  var roleChatType = '';
  var accountType = '';

  if ( !isChatRoomEmpty ) {
    switch ( chatRoom.chatType ) {
      case 'private':
        if ( chatRoom.members.length > 0 ) {
          roleChatType = chatRoom.members[0].role;
          accountType = chatRoom.members[0].accountType;
        }
        break;
      case 'direct':
        if ( !isUserEmpty ) {
          for ( var i = 0; i < chatRoom.members.length; i++ ) {
            var member = chatRoom.members[i];

            if ( member._id != user._id ) {
              roleChatType = member.role;
              accountType = member.accountType;
              break;
            } else {
              continue;
            }
          }
        }
        break;
      case 'public':
        roleChatType = 'public';
        break;
      default:
        break;
    }
  }

  if ( type === 'role-chat' ) {
    return roleChatType;
  }
  return accountType;
}
