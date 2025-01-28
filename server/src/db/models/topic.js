'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {

    static associate({User, Card}) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.hasMany(Card, { foreignKey: 'topicId', as: 'card' });
    }
  }
  Topic.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};