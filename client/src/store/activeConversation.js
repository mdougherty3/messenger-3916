const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (convoId, otherUserId) => {
  return {
    type: SET_ACTIVE_CHAT,
    payload: { convoId, otherUserId },
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return {
        convoId: action.payload.convoId,
        otherUserId: action.payload.otherUserId,
      };
    }
    default:
      return state;
  }
};

export default reducer;
