"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Topic, Progress, Card }) {
      this.hasMany(Topic, { foreignKey: "userId" });
      this.hasMany(Progress, { foreignKey: "userId", as: "progresses" });
      this.hasMany(Card, { foreignKey: "userId", as: "card" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
