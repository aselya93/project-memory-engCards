const CardController = require("../controllers/Card.controller");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");


const router = require("express").Router();

router
  .get("/:id", verifyRefreshToken, CardController.getCardsByTopic) // полчить все карточки по теме  topics/cards/:topicId/
  .post("/:id", verifyRefreshToken, CardController.createCard)
  .put("/:id", verifyRefreshToken, CardController.markAsLearned); 

module.exports = router;
