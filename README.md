# Страница сбора для Максима

## Как обновить суммы, тексты и ссылки
Всё содержимое страницы лежит в одном файле **config.js**. Откройте его в любом текстовом редакторе
(или прямо на сайте GitHub, кнопка с карандашом), поменяйте числа или текст в кавычках и сохраните.

- Собранные суммы: поле `raised` у каждой из трёх целей. Общая сумма считается сама.
- Дата «Суммы обновлены»: поле `updated`.
- Фото: положите файлы в папку `photos/` и допишите строку в список `photos`.
- Документы: файлы в `docs/`, строка в список `documents`. Для PDF заполните поле `pdf`.
- Видео: свой mp4 в `video/` (`type: "file"`) или ссылка на VK Видео / Rutube.
- Реквизиты: список `payments`, каждая вкладка отдельно.

Единственное, что живёт не в config.js: превью ссылки для мессенджеров (теги `og:` в начале index.html).

## Аналитика
1. Создайте счётчик на metrika.yandex.ru (бесплатно), включите Вебвизор.
2. Впишите номер счётчика в `analytics.yandexMetrikaId`, поставьте `debug: false`.
3. В Метрике создайте цели типа «JavaScript-событие» с нужными именами, например:
   `view_story`, `read_story_all`, `photo_swipe`, `photo_seen_all`, `doc_open`, `video1_play`,
   `video1_complete`, `faq_open_1`, `copy_any`, `cta_hero`, `share_click`, `scroll_100`.

## Сжатие видео перед загрузкой
`ffmpeg -i input.mov -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart video/intro.mp4`

## Публикация
Сайт живёт на https://maks-go.ru (хостинг SpaceWeb). Код хранится здесь, на GitHub:
каждый коммит в ветку main через пару минут сам заливается на хостинг по FTP
(файл `.github/workflows/deploy-sweb.yml`, ход заливки виден во вкладке **Actions**).

Один раз нужно добавить данные FTP: **Settings → Secrets and variables → Actions → New repository secret**:
- `FTP_SERVER`: адрес FTP-сервера из панели SpaceWeb (например `ftp.xxxxx.sweb.ru` или IP);
- `FTP_USERNAME` и `FTP_PASSWORD`: логин и пароль FTP;
- `FTP_DIR` (необязательно): папка сайта со слешем на конце, например `public_html/`. Не нужен, если FTP-пользователь
  сразу попадает в папку сайта: тогда файлы заливаются в корень FTP.

Если заливка падает на подключении, во вкладке **Variables** создайте переменную `FTP_PROTOCOL` = `ftp`.
Перезапустить заливку вручную: Actions → Deploy to SpaceWeb → Run workflow.

Файлы `README.md`, `.nojekyll` и папка `.github` на хостинг не попадают.
