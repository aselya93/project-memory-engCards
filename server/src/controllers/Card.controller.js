const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");
const CardService = require("../services/Card.service");
const CardValidator = require("../utils/Card.validator");

class CardController {
  // Получить карточки темы (с фильтром по isLearned)
  static async getCardsByTopic(req, res) {
    try {
      const { id } = req.params; // ID темы
      const { isLearned } = req.query; // Опциональный фильтр

      if (!isValidId(id)) {
        return res.status(400).json(formatResponse(400, "Invalid topic ID"));
      }

      const whereClause = { topicId: id };
      if (isLearned !== undefined) {
        whereClause.isLearned = isLearned === "true"; // Привести строку к Boolean
      }

      const cards = await CardService.getAllNotLearned(id);
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
      const { englishWord, russianWord, topicId } = req.body;
      const { user } = res.locals;

      const { isValid, error } = CardValidator.validate({
        englishWord,
        russianWord,
        topicId,
      });

      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Validation error", null, error));
      }

      const newCard = await CardService.create({
        englishWord,
        russianWord,
        topicId,
        userId: user.id,
      });

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

      const updatedCard = await CardService.updateIsLearned(id, true);

      if (!updatedCard) {
        return res
          .status(404)
          .json(formatResponse(404, `Card with id ${id} not found`));
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
