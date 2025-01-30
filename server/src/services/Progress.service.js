// const { Card } = require("../db/models");

// class ProgressService {
//   static async getProgress(userId, topicId) {
//     try {
//       // Получаем общее количество карточек по теме
//       const totalCards = await Card.count({ where: { topicId } });

//       // Получаем количество изученных карточек
//       const learnedCards = await Card.count({
//         where: { topicId, userId, isLearned: true },
//       });

//       return {
//         topicId,
//         userId,
//         learnedCards,
//         totalCards,
//         progressPercentage: totalCards
//           ? Math.round((learnedCards / totalCards) * 100)
//           : 0,
//       };
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }

//   static async updateProgress(userId, topicId, cardId) {
//     try {
//       const card = await Card.findOne({
//         where: { id: cardId, userId, topicId },
//       });

//       if (!card) {
//         throw new Error("Карточка не найдена или не принадлежит пользователю");
//       }

//       if (!card.isLearned) {
//         card.isLearned = true;
//         await card.save();
//       }

//       return await this.getProgress(userId, topicId);
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }

// module.exports = ProgressService;
