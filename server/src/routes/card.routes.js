const CardController = require("../controllers/Card.controller");

const router = require("express").Router();

router
.get("/:topicId", CardController.getCardsByTopic) // полчить все карточки по теме  topics/:topicId/cards
.post('/', CardController.createCard)
.put('/:id', CardController.markAsLearned) //  topics/:topicId/cards/:id

module.exports = router;