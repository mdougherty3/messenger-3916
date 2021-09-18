import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setConvoRead,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    const { activeConversation } = store.getState();
    const incrementUnreadCount =
      activeConversation.convoId !== data.message.conversationId;

    store.dispatch(
      setNewMessage(data.message, data.sender, incrementUnreadCount)
    );

    if (!incrementUnreadCount) {
      socket.emit("convo-read", activeConversation.convoId, data.senderId);
    }
  });

  socket.on("convo-read", (convoId, readByUserId) => {
    const { user } = store.getState();
    store.dispatch(setConvoRead(convoId, user.id, readByUserId));
  });
});

export default socket;
