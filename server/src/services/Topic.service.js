const { Topic } = require("../db/models");

class TopicService {
  static async getAll() {
    return await Topic.findAll({
      include: ["user", "card"], // Ассоциации, указанные в модели Topic
    });
  }

  static async getById(topicId) {
    return await Topic.findByPk(topicId, {
      include: ["user", "card"],
    });
  }
  
}

module.exports = TopicService;
