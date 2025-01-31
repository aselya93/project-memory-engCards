require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors'); 
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser'); 
const removeHTTPHeader = require('../middleware/removeHeader'); 

const { CLIENT_URL } = process.env;


const corsConfig = {
  origin: [CLIENT_URL, 'https://www.google.com'],
  credentials: true,
}

const serverConfig = (app) => {
  //* позволяет работать с телом запроса
  app.use(express.urlencoded({ extended: true }));

  //* парсит JSON
  app.use(express.json());

  //* логирует данные о запросах на сервер
  app.use(morgan('dev'));

  //* парсит куки
  app.use(cookieParser());

  //* встраивает заголовки для cors-политики
  app.use(cors(corsConfig));

  //* кастомная мидлварка для удаления HTTP заголовка
  app.use(removeHTTPHeader);

  //* настройка статики, папка public ассоциирована с маршрутом запроса
  app.use(
    '/static/images',
    express.static(path.resolve(__dirname, '..', 'public', 'images'))
  );
};

module.exports = serverConfig;
