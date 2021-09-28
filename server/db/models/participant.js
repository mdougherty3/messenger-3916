const Sequelize = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Participant = db.define("participant", {
  lastReadMessageId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
        model: Message,
        key: 'id'
    }
  },
});

module.exports = Participant;
