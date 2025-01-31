const formatResponse = require("../utils/formatResponse");
const TopicService = require("../services/Topic.service");
const isValidId = require("../utils/isValidId");

class TopicController {
  static async getAllTopics(req, res) {
    try {
      const topics = await TopicService.getAll();
      if (topics.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Topics not found", []));
      }

      res.status(200).json(formatResponse(200, "success", topics));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getTopicById(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json(formatResponse(400, "Invalid Topic ID"));
      }
      const oneTopic = await TopicService.getById(id);
      if (!oneTopic) {
        return res
          .status(404)
          .json(formatResponse(404, `Topic with id ${id} not found`));
      }
      res.status(200).json(formatResponse(200, "success", oneTopic));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = TopicController;
