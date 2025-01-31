"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate({ Topic, User }) {
      this.belongsTo(Topic, { foreignKey: "topicId", as: "topic" });
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  Card.init(
    {
      englishWord: DataTypes.STRING,
      russianWord: DataTypes.STRING,
      isLearned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      topicId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Card",
    }
  );

  return Card;
};
