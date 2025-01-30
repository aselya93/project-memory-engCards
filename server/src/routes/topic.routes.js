const router = require("express").Router();
const TopicController = require("../controllers/Topic.controller");
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router
  .get("/",verifyRefreshToken, TopicController.getAllTopics)
  .get("/:id", TopicController.getTopicById);

module.exports = router;
