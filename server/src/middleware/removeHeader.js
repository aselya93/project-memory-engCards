//* Функция middleware для удаления заголовка 'x-powered-by' из ответа
const removeHTTPHeader = (req, res, next) => {
  //* Удаляем заголовок 'x-powered-by', который может раскрывать информацию о технологии сервера
  res.removeHeader('x-powered-by');

  //* Переход к следующему middleware или обработчику маршрута
  next();
};

module.exports = removeHTTPHeader;
