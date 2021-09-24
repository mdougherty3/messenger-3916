const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant");

// associations

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.belongsToMany(Conversation, { through: Participant });
Conversation.belongsToMany(User, { through: Participant });
User.hasMany(Participant);
Participant.belongsTo(User);
Conversation.hasMany(Participant);
Participant.belongsTo(Conversation);

module.exports = {
  User,
  Conversation,
  Message,
  Participant,
};
