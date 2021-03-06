const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");
const db = require("../../db");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: [
        "id",
        [
          db.literal(`(
                SELECT MAX("createdAt")
                FROM "messages" AS "latestMessage"
                WHERE
                    "latestMessage"."conversationId" = "conversation"."id"
            )`),
          "latestMessageDate",
        ],
        [
          db.literal(`(
                SELECT COUNT(*) 
                FROM "messages" as "messageCount"
                WHERE "messageCount"."conversationId" = "conversation"."id"
                  AND ("user1"."id" = "messageCount"."senderId"
                    OR "user2"."id" = "messageCount"."senderId")
                  AND NOT "readStatus"
            )`),
          "unreadMessageCount",
        ],
      ],
      order: [
        [db.literal('"latestMessageDate"'), "DESC"],
        [Message, "createdAt", "ASC"],
      ],

      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages.slice(-1)[0].text;
      convoJSON.latestMessageId = convoJSON.messages.slice(-1)[0].id;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.patch("/markRead/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const { convoId, otherUserId } = req.body;

    // mark all convo messages matching other user id as read
    await Message.update(
      {
        readStatus: true,
      },
      {
        where: {
          senderId: otherUserId,
          conversationId: convoId,
          readStatus: false,
        },
      }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
