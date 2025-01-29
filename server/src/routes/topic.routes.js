const router = require("express").Router();
const TopicController = require("../controllers/Topic.controller");

router
  .get("/", TopicController.getAllTopics)
  // .get("/:id", TopicController.getTopicById);

module.exports = router;
