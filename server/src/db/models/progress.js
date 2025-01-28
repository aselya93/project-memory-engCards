"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    static associate({Topic, User }) {
      this.belongsTo(Topic, { foreignKey: "topicId" });
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Progress.init(
    {
      learnedCards: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      topicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Progress",
    }
  );
  return Progress;
};
