export const addMessageToStore = (state, payload) => {
  const { message, sender, incrementUnreadCount } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      latestMessageDate: message.createdAt,
      unreadMessageCount: 1,
    };
    newConvo.latestMessageText = message.text;
    newConvo.latestMessageId = message.id;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      // increment unread count if message was sent by other user
      if (message.senderId === convo.otherUser.id) {
        if (incrementUnreadCount) {
          convoCopy.unreadMessageCount++;
        } else {
          message.readStatus = true;
        }
      }
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.latestMessageId = message.id;
      convoCopy.latestMessageDate = message.createdAt;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.unreadMessageCount = 0;
      convoCopy.latestMessageText = message.text;
      convoCopy.latestMessageId = message.id;
      convoCopy.latestMessageDate = message.createdAt;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const setConvoReadInStore = (
  state,
  convoId,
  currentUserId,
  readByUserId
) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const convoCopy = { ...convo };
      convoCopy.messages.forEach((msg) => {
        if (!msg.readStatus) {
          if (msg.senderId !== readByUserId) {
            msg.readStatus = true;
            if (readByUserId === currentUserId) {
              convoCopy.unreadMessageCount--;
            }
          }
        }
      });
      return convoCopy;
    } else {
      return convo;
    }
  });
};
