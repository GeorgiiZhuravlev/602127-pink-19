var moduleControl = {
  'map': {
    'path': document.querySelector('#module__map'),
    open: function () {
      moduleControl.map.path.classList.remove('vis-off');
      moduleControl.map.path.addEventListener('click', moduleControl.map.close);
    },
    close: function () {
      moduleControl.map.path.classList.add('vis-off');
    }
  },
  // 1. confirm
  // 2. error
  // Управляются файлом contest-form-check.js
  'confirm': {
    'path': document.querySelector('#module__confirm-message'),
    open: function () {
      moduleControl.confirm.path.classList.remove('vis-off');
      moduleControl.confirm.path.addEventListener('click', moduleControl.confirm.close);
      moduleControl.confirm.path.querySelector('.module__btn').addEventListener('click', moduleControl.confirm.close)
      moduleControl.confirm.path.querySelector('.module__btn').focus();
    },
    close: function () {
      moduleControl.confirm.path.classList.add('vis-off');
      form.submit();
    }
  },
  'error': {
    'path': document.querySelector('#module__error-message'),
    open: function () {
      moduleControl.error.path.classList.remove('vis-off');
      moduleControl.error.path.addEventListener('click', moduleControl.error.close);
      moduleControl.error.path.querySelector('.module__btn').addEventListener('click', moduleControl.error.close);
      moduleControl.error.path.querySelector('.module__btn').focus();
    },
    close: function () {
      moduleControl.error.path.classList.add('vis-off');
    }
  }
}

try {
  if (moduleControl.map.path) {
    var btnMap = document.querySelector('.contacts__map-btn');
    btnMap.addEventListener('click', moduleControl.map.open);
  } else {
    throw new ReferenceError('Модуль отсутствует: index.html | Интерактивная карта');
  }

  if (moduleControl.confirm.path) {
    var btnMap = document.querySelector('.contacts__map-btn');
    btnMap.addEventListener('click', moduleControl.map.open);
  } else {
    throw new ReferenceError('Модуль отсутствует: form.html | Окно подтверждения');
  }

  if (moduleControl.error.path) {
    var btnMap = document.querySelector('.contacts__map-btn');
    btnMap.addEventListener('click', moduleControl.map.open);
  } else {
    throw new ReferenceError('Модуль отсутствует: form.html | Окно ошибки');
  }
} catch (err) {
  console.log(err.message);
}
