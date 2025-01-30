// const ProgressService = require("../services/Progress.service");
// const formatResponse = require("../utils/formatResponse");

// class ProgressController {
//   static async getProgress(req, res) {
//     try {
//       const { user } = res.locals; // Берем пользователя из res.locals
//       const { topicId } = req.params;

//       if (!user) {
//         return res.status(401).json(formatResponse(401, "Неавторизованный доступ", null, "User not found"));
//       }

//       const progress = await ProgressService.getProgress(user.id, topicId);

//       res.json(formatResponse(200, "Прогресс успешно получен", progress));
//     } catch (error) {
//       res.status(500).json(formatResponse(500, "Ошибка получения прогресса", null, error.message));
//     }
//   }

//   static async updateProgress(req, res) {
//     try {
//       const { user } = res.locals; // Берем пользователя из res.locals
//       const { topicId } = req.body; // Обновляем прогресс по теме

//       if (!user) {
//         return res.status(401).json(formatResponse(401, "Неавторизованный доступ", null, "User not found"));
//       }

//       const progress = await ProgressService.updateProgress(user.id, topicId);

//       res.json(formatResponse(200, "Прогресс обновлен", progress));
//     } catch (error) {
//       res.status(500).json(formatResponse(500, "Ошибка обновления прогресса", null, error.message));
//     }
//   }
// }

// module.exports = ProgressController;
