const { Card } = require("../db/models");

class CardService {
  static async getCardsByTopic(topicId) {
    return await Card.findAll({ where: { topicId } });
  }

  // Создать новую карточку
  static async create(data) {
    return await Card.create({
      ...data,
      isLearned: data.isLearned || false,
    });
  }

  // Обновить статус "изучено" для карточки
  static async updateIsLearned(id, isLearned) {
    const card = await Card.findByPk(id);
    if (!card) return null;

    card.isLearned = isLearned;
    await card.save();
    return card;
  }
}

module.exports = CardService;
