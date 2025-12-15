"use strict";

(function () {
  'use strict';

  // Проверяем, не загружен ли уже плагин
  if (window.plugin_auto_config_ready) return;

  // 1. Базовые настройки Lampa при старте
  function applyBasicSettings() {
    console.log('[AutoConfig] Применяем базовые настройки...');

    // Включаем торренты и отключаем демо-режим
    window.lampa_settings.torrents_use = true;
    window.lampa_settings.demo = false;
    window.lampa_settings.read_only = false;

    // Сохраняем в Storage для надежности
    Lampa.Storage.set('torrents_use', true);
    Lampa.Storage.set('demo', false);
    Lampa.Storage.set('read_only', false);

    // Включаем парсер в поиске
    Lampa.Storage.set('parse_in_search', true);
    Lampa.Storage.set('parser_use', true);
  }

  // 2. Настройка парсера по умолчанию (jackred.xyz)
  function setupDefaultParser() {
    console.log('[AutoConfig] Настраиваем парсер по умолчанию...');

    // Устанавливаем jackred.xyz как парсер по умолчанию
    Lampa.Storage.set('parser_torrent_type', 'jackett');
    Lampa.Storage.set('jackett_url', 'jacred.xyz');
    Lampa.Storage.set('jackett_key', '');
    Lampa.Storage.set('parser_cache', true);
    Lampa.Storage.set('parser_timeout', 10);

    // Сохраняем выбор парсера для отображения в интерфейсе
    Lampa.Storage.set('lme_url_two', 'jacred_xyz');
  }

  // 3. Настройка TorrServer
  function setupTorrServer() {
    console.log('[AutoConfig] Настраиваем TorrServer...');

    // Основные настройки TorrServer
    Lampa.Storage.set('torrserver_url', 'lampac.fun/ts');
    Lampa.Storage.set('torrserver_use_link', 'one');
    Lampa.Storage.set('torrserver_auth', true);
    Lampa.Storage.set('torrserver_login', '4u2koolq');
    Lampa.Storage.set('torrserver_password', 'ts');
    Lampa.Storage.set('torrserver_use', true);
    Lampa.Storage.set('torrserver_cache', true);
    Lampa.Storage.set('torrserver_timeout', 10);
  }

  // 4. Переводы для интерфейса
  function addTranslations() {
    Lampa.Lang.add({
      lme_parser: {
        ru: 'Каталог парсеров',
        en: 'Parsers catalog',
        uk: 'Каталог парсерів',
        zh: '解析器目录'
      },
      lme_parser_description: {
        ru: 'Нажмите для выбора парсера из ',
        en: 'Click to select a parser from the ',
        uk: 'Натисніть для вибору парсера з ',
        zh: '单击以从可用的 '
      }
    });
  }

  // 5. Список парсеров (как в примере)
  var parsersInfo = [{
    base: 'lampa_app',
    name: 'Lampa',
    settings: {
      url: 'lampa.app',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacred_viewbox_dev',
    name: 'Viewbox',
    settings: {
      url: 'jacred.viewbox.dev',
      key: 'viewbox',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'freebie_tom_ru',
    name: 'Freebie',
    settings: {
      url: 'jacred.freebie.tom.ru',
      key: '1',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'trs_my_to',
    name: 'Trs',
    settings: {
      url: 'trs.my.to:9118',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacred_my_to',
    name: 'Jacred',
    settings: {
      url: 'jacred.my.to',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacred_xyz',
    name: 'Jacred XYZ',
    settings: {
      url: 'jacred.xyz',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jac_red_ru',
    name: 'Jac-red',
    settings: {
      url: 'jac-red.ru',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacred_pro',
    name: 'Jacred Pro',
    settings: {
      url: 'jacred.pro',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'ru_jacred_pro',
    name: 'Jacred RU Pro',
    settings: {
      url: 'ru.jacred.pro',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jr_maxvol_pro',
    name: 'Maxvol',
    settings: {
      url: 'jr.maxvol.pro',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacblack_ru',
    name: 'Jacblack',
    settings: {
      url: 'jacblack.ru:9117',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'spawn_pp_ua',
    name: 'Spawn',
    settings: {
      url: 'spawn.pp.ua:59117',
      key: '2',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'lampa32',
    name: 'Lampa32',
    settings: {
      url: '62.60.149.237:2601',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacred_maxvol_pro',
    name: 'Jacred Maxvol',
    settings: {
      url: 'jr.maxvol.pro',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jacred_ru',
    name: 'Jacred RU',
    settings: {
      url: 'jac-red.ru',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }, {
    base: 'jac_black',
    name: 'Jac Black',
    settings: {
      url: 'jacblack.ru:9117',
      key: '',
      parser_torrent_type: 'jackett'
    }
  }];

  // 6. Функция смены парсера
  function changeParser() {
    var jackettUrlTwo = Lampa.Storage.get("lme_url_two");
    var selectedParser = parsersInfo.find(function (parser) {
      return parser.base === jackettUrlTwo;
    });
    if (selectedParser) {
      var settings = selectedParser.settings;
      Lampa.Storage.set("parser_torrent_type", settings.parser_torrent_type);
      Lampa.Storage.set("jackett_url", settings.url);
      Lampa.Storage.set("jackett_key", settings.key);
      console.log('[AutoConfig] Парсер изменен на:', selectedParser.name);
    }
  }

  // 7. Добавление настроек парсеров в интерфейс
  function addParserSettings() {
    var s_values = parsersInfo.reduce(function (prev, parser) {
      prev[parser.base] = parser.name;
      return prev;
    }, {
      no_parser: 'Не выбран'
    });
    Lampa.SettingsApi.addParam({
      component: 'parser',
      param: {
        name: 'lme_url_two',
        type: 'select',
        values: s_values,
        "default": 'jacred_xyz'
      },
      field: {
        name: "<div class=\"settings-folder\" style=\"padding:0!important\"><div style=\"font-size:1.0em\">" + Lampa.Lang.translate('lme_parser') + "</div></div>",
        description: Lampa.Lang.translate('lme_parser_description') + " " + parsersInfo.length
      },
      onChange: function onChange(value) {
        Lampa.Storage.set('lme_url_two', value);
        changeParser();
        Lampa.Settings.update();
      },
      onRender: function onRender(item) {
        // Показываем элемент только если включен парсер
        if (Lampa.Storage.field('parser_use')) {
          item.show();
          // Перемещаем нашу настройку в раздел парсеров
          $('div[data-name="lme_url_two"]').insertAfter('div[data-children="parser"]');
        } else {
          item.hide();
        }
      }
    });
  }

  // 8. Проверка доступности парсеров (опционально, можно удалить если не нужно)
  var parserStatuses = {};
  function checkSingleParser(parser, callback) {
    var url = parser.settings.url;
    var checkUrl = 'http://' + url + '/api';
    fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(function (response) {
      console.log("[AutoConfig] Парсер", parser.name, "доступен");
      parserStatuses[parser.base] = 'online';
      callback(true);
    })["catch"](function (error) {
      fetch('http://' + url, {
        method: 'HEAD'
      }).then(function (response) {
        console.log("[AutoConfig] Парсер", parser.name, "доступен (альтернативная проверка)");
        parserStatuses[parser.base] = 'online';
        callback(true);
      })["catch"](function () {
        console.warn("[AutoConfig] Парсер", parser.name, "недоступен");
        parserStatuses[parser.base] = 'offline';
        callback(false);
      });
    });
  }

  // 9. Основная функция инициализации плагина
  function initializePlugin() {
    console.log('[AutoConfig] Инициализация плагина...');

    // Применяем все настройки
    applyBasicSettings();
    setupDefaultParser();
    setupTorrServer();
    addTranslations();
    addParserSettings();

    // Проверяем доступность парсеров при открытии раздела
    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name === 'parser') {
        console.log('[AutoConfig] Проверяем доступность парсеров...');
        parsersInfo.forEach(function (parser) {
          checkSingleParser(parser, function () {});
        });
      }
    });
    console.log('[AutoConfig] Плагин успешно инициализирован!');
  }

  // 10. Запуск плагина
  function startPlugin() {
    window.plugin_auto_config_ready = true;

    // Ждем готовности приложения
    if (window.appready) {
      initializePlugin();
    } else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') {
          initializePlugin();
        }
      });
    }
  }

  // Запускаем плагин
  startPlugin();
})();
