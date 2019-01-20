/**
 * Check if direct chat room member is online
 * @param {array} members
 * @param {string} activeUserID
 */
export function isDirectChatRoomMemberOnline(members, activeUserID) {
  var memberIndex = members.findIndex(singleMember => singleMember._id !== activeUserID);

  if ( ( memberIndex > -1 ) && ( members[memberIndex].isOnline ) ) {
    return true;
  }

  return false;
}
