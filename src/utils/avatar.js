import { isObjectEmpty } from './object';

/**
 * Handle chat room avatar badges
 *
 * @param {Object} chatRoom
 * @param {Object} user
 * @param {string} type
 */
export function handleChatRoomAvatarBadges(chatRoom={}, user={}, type='account') {
  const isChatRoomEmpty = isObjectEmpty(chatRoom);
  const isUserEmpty = isObjectEmpty(user);

  if (isChatRoomEmpty && isUserEmpty) {
    return '';
  }

  let roleChatType = '';
  let accountType = '';

  if (!isChatRoomEmpty) {
    switch (chatRoom.chatType) {
      case 'private':
        if (chatRoom.members.length > 0) {
          roleChatType = chatRoom.members[0].role;
          accountType = chatRoom.members[0].accountType;
        }
        break;
      case 'direct':
        if (!isUserEmpty) {
          const members = chatRoom.members;
          const memberIndex = members.findIndex((singleMember) => {
            return singleMember._id !== user._id;
          });

          if (memberIndex > -1) {
            roleChatType = members[memberIndex].role;
            accountType = members[memberIndex].accountType;
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

  if (type === 'role-chat') {
    return roleChatType;
  }

  return accountType;
}
