/**
 *   statusCode: number,  // HTTP статус код
 *   message: string,     // Сообщение
 *   data: object|null,   // Данные или null
 *   errors: object|null   // Ошибка или null
 */
function formatResponse(statusCode, message, data = null, error = null) {
  return {
    statusCode,
    message,
    data,
    error,
  };
}

module.exports = formatResponse;
