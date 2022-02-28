  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
    }; // создаем обьект с информированием статуса загрузки для пользователя

   let form = document.querySelector('.main-form'), // получаем форму из HTML структуры и все ее input
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'); // создаем новый блок для вывода сообщений о статусе загрузки для пользователя и стилизуем новый блок

        statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault();             // отменяет стандартное поведение браузера, при нажатии на кнопку страница не перезагружается
            form.appendChild(statusMessage);      // оповещаем пользователя о статусе загрузки для этого мы добавляем класс status созданный ранее в переменной statusMessage

            let request = new XMLHttpRequest();       // создаем переменную для запроса отправки формы 
            request.open('POST', 'server.php');         // настройки запроса
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');      // настройка заголовков HTTP запросов


            let formData = new FormData(form);          // этим конструктором мы получаем данные от пользователя

            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);                   // превращает обьект в JSON формат
            request.send(json);                               // отправляем данные нв сервер
       

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if(request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });                                           // проверяем статус загрузки и выводим информацию для пользователя

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }                                           // 'этим циклом мы очищаем форму

        });                                           // привязываем обработчик событий подтверждающий отправку формы на саму форму, а не на кнопку.
