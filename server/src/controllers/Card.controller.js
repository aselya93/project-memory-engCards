const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");
const CardService = require("../services/Card.service");
const CardValidator = require("../utils/Card.validator");

class CardController {
  //получаю все карточки по теме
  static async getCardsByTopic(req, res) {
    try {
      const { id } = req.params; // ID темы
      if (!isValidId(id)) {
        return res.status(400).json(formatResponse(400, "Invalid topic ID"));
      }
      const cards = await CardService.getCardsByTopic(id);
      console.log(222222, cards);
      // Получаем все карточки
      res.status(200).json(formatResponse(200, "success", cards));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  // Создать новую карточку
  static async createCard(req, res) {
    try {
      const { englishWord, russianWord } = req.body;
      const { user } = res.locals;
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json(formatResponse(400, "Invalid topic ID"));
      }

      const { isValid, error } = CardValidator.validate({
        englishWord,
        russianWord,
        // isLearned,
      });

      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Validation error", null, error));
      }

      const newCard = await CardService.create(
        req.body
        // englishWord,
        // russianWord,
        // isLearned: false,
        // userId: user.id,
        // topicId:
      );

      res
        .status(201)
        .json(formatResponse(201, "Card created successfully", newCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  // Пометить карточку как изученную
  static async markAsLearned(req, res) {
    try {
      const { id } = req.params; // ID карточки
      if (!isValidId(id)) {
        return res.status(400).json(formatResponse(400, "Invalid card ID"));
      }

      const updatedCard = await CardService.updateIsLearned(id, true); // Помечаем карточку как изученную

      if (!updatedCard) {
        return res.status(404).json(formatResponse(404, `Card not found`));
      }

      res
        .status(200)
        .json(formatResponse(200, "Card marked as learned", updatedCard));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = CardController;
