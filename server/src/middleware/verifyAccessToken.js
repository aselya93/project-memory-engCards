require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

//NOTE Функция для верификации access токена
function verifyAccessToken(req, res, next) {
  try {
    //* Извлекаем accessToken из заголовков запроса
    const accessToken = req.headers.authorization.split(' ')[1];

    //* Проверка и декодирование accessToken с использованием секрета
    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);

    //* Сохраняем пользователя в объект `locals` ответа для дальнейшего использования
    res.locals.user = user;

    //* Переходим к следующему middleware или обработчику маршрута
    next();
  } catch ({ message }) {
    //! Обработка ошибок: если токен недействителен или истек
    console.log('======= Invalid access token =======', message);
    res
      .status(403) //! Устанавливаем код статуса ответа
      .json(
        formatResponse(
          403,
          'Invalid access token', //! Сообщение об ошибке
          null, //! Данные отсутствуют
          'Invalid access token' //! Дополнительное сообщение об ошибке
        )
      );
  }
}

module.exports = verifyAccessToken;
