# Leaflet DG JSONP Plugin

Плагин для ассинхронных кросс-доменных HTTP (AJAX) запросов.

Текущая версия: 1.0.1

Copyright (c) 2013, 2GIS, Andrey Chizh

## Документация
### Параметры

    url      {String} URL запрашиваемой страницы
    data     {Object} Передаваемые данные
    timeout  {Number} Время таймаута в миллисекундах

### Функции обратного вызова:

    success    {Function} Срабатывает, если ошибок не возникло.
                          В качестве аргумента передает полученные данные.
    error      {Function} Срабатывает, если произошла ошибка.
                          В качестве аргумента передает информацию о ошибке.
    beforeSend {Function} Срабатывает перед отправкой запроса
    complete   {Function} Срабатывает по окончанию отправки запроса

### Возвращает:

    {Object} Объект, содержащий в себе метод отмены запроса

### Методы:

    Отмена запроса
    cancel();

## Примеры
### Базовое использование:

    L.DG.Jsonp({
        url: 'http://catalog.api.2gis.ru/project/list',
        data: {
            output: 'jsonp',
            key: '123456',
            version: 1.3,
            lang: 'ru'
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        },
        beforeSend: function() {
            console.log('beforeSend');
        },
        complete: function() {
            console.log('complete');
        }
    });

### Отмена запроса:

    var jsonp = L.DG.Jsonp({
        url: 'http://catalog.api.2gis.ru/project/list',
        data: {
            output: 'jsonp',
            key: '123456',
            version: 1.3,
            lang: 'ru'
        },
        success: function(data) {
            console.log(data);
        }
    });

    jsonp.cancel():