require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

//NOTE Функция для верификации refresh токена
function verifyRefreshToken(req, res, next) {
  try {
    //* Извлекаем refresh токен из куков запроса
    const { refreshToken } = req.cookies;

    //* Проверка и декодирование refresh токена с использованием секрета
    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);

    //* Сохраняем пользователя в объект `locals` ответа для дальнейшего использования
    res.locals.user = user;

    //* Переходим к следующему middleware или обработчику маршрута
    next();
  } catch ({ message }) {
    //! Обработка ошибок: если токен недействителен или истек
    console.log('======= Invalid refresh token =======', message);
    //! Очищаем куку refreshToken и отправляем ошибку с кодом 401 (Unauthorized)
    res
      .status(401) //! Устанавливаем код статуса ответа
      .clearCookie('refreshToken') //! Очистка куки с токеном
      .json(
        //! Форматируем и отправляем ответ в формате JSON
        formatResponse(
          401,
          'Invalid refresh token', //! Сообщение об ошибке
          null, //! Данные отсутствуют
          'Invalid refresh token' //! Дополнительное сообщение об ошибке
        )
      );
  }
}

module.exports = verifyRefreshToken;
