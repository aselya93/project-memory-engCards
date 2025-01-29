const { Card, Topic } = require("../db/models");

class CardService {

  static async getCardsByTopic(topicId, where = {}) {
    return await Card.findAll({
      where: { topicId, ...where },
    });
  }
  
  // Получить все не изученные карточки для темы
  static async getAllNotLearned(topicId) {
    return await Card.findAll({
      where: {
        topicId,
        isLearned: false,
      },
    });
  }

  // Получить все изученные карточки для темы
  static async getLearnedByTopicId(topicId, where = {}) {
    return await Card.findAll({
      where: { topicId, ...where },
    });
  }

  // Создать новую карточку
  static async create(data) {
    return await Card.create({
      ...data,
      isLearned: data.isLearned || false,
    });
  }

  // Обновить статус "изучено" для карточки
  static async updateIsLearned(cardId, isLearned) {
    const card = await Card.findByPk(cardId);
    if (!card) return null;

    card.isLearned = isLearned;
    await card.save();
    return card;
  }
}

module.exports = CardService;
