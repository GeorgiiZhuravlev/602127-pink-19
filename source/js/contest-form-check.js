// Data collect: User name
var userName = document.querySelectorAll('.contest-name__input');

// Data collect: User achievements
var userAchievements = document.querySelectorAll('.contest-achievements__input');

// Data collect: User contacts
var userContacts = document.querySelectorAll('.contest-contacts__input');

// Data collect: User device
var userDevice = document.querySelectorAll('.contest-device__input');

// Data collect: User text
var userText = document.querySelector('.contest-emotions__user-text');

// Define submit button
var btn_submit = document.querySelector('.contest__submit-btn');

// Prevent form redirect safely (progressive)
btn_submit.setAttribute('type', 'button');

// Include saved data by page loading
window.addEventListener('load', LocStorageSet);

function LocStorageSet() {
  for (let i = 0; i < userName.length; i++) {
    userName[i].value = localStorage.getItem(userName[i].name);
  }

  for (let i = 0; i < userAchievements.length; i++) {
    if (localStorage.getItem(userAchievements[i].value) === 'true') {
      userAchievements[i].checked = true;
    } else if (localStorage.getItem(userAchievements[i].value) === 'false') {
      userAchievements[i].checked = false;
    }
  }

  for (let i = 0; i < userContacts.length; i++) {
    userContacts[i].value = localStorage.getItem(userContacts[i].name);
  }

  for (let i = 0; i < userDevice.length; i++) {
    if (localStorage.getItem(userDevice[i].name) === 'true') {
      userDevice[i].checked = true;
    }
  }

  userText.value = localStorage.getItem(userText.name);
}

// Save in local storage
btn_submit.addEventListener('click', LocStorageUpdate);

function LocStorageUpdate() {
  if (confirm('Хотите сохранить введенные данные?')) {
    for (let i = 0; i < userName.length; i++) {
      localStorage.setItem(userName[i].name, userName[i].value);
    }

    for (let i = 0; i < userAchievements.length; i++) {
      localStorage.setItem(userAchievements[i].value, userAchievements[i].checked);
    }

    for (let i = 0; i < userContacts.length; i++) {
      localStorage.setItem(userContacts[i].name, userContacts[i].value);
    }

    for (let i = 0; i < userDevice.length; i++) {
      if (userDevice[i].checked) {
        localStorage.setItem(userDevice[i].name, userDevice[i].checked);
      }
    }

    localStorage.setItem(userText.name, userText.value);
  } else {
    localStorage.clear();
  }
}

// Form check
var form = document.querySelector('.contest__form');

var moduleControl = {
  'confirm': {
    'path': document.querySelector('#confirm-message'),
    open: function () {
      moduleControl.confirm.path.classList.remove('vis-off');
      moduleControl.confirm.path.addEventListener('click', moduleControl.confirm.close);
      moduleControl.confirm.path.querySelector('.module__btn').addEventListener('click', moduleControl.confirm.close);
    },
    close: function () {
      moduleControl.confirm.path.classList.add('vis-off');
      form.submit();
    }
  },
  'error': {
    'path': document.querySelector('#error-message'),
    open: function () {
      moduleControl.error.path.classList.remove('vis-off');
      moduleControl.error.path.addEventListener('click', moduleControl.error.close);
      moduleControl.error.path.querySelector('.module__btn').addEventListener('click', moduleControl.error.close);
    },
    close: function () {
      moduleControl.error.path.classList.add('vis-off');
    }
  }
}

btn_submit.addEventListener('click', FormCheck);

function FormCheck() {
  if (form.checkValidity()) {
    moduleControl.confirm.open();
  } else {
    moduleControl.error.open();
  }
}

