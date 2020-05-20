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

  if (localStorage.getItem('userDevice')) {
    userDevice[localStorage.getItem('userDevice')].checked = 'true';
  }

  if (localStorage.getItem(userText.name) == null) {
    userText.value = '';
  } else {
    userText.value = localStorage.getItem(userText.name);
  }
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
        localStorage.setItem('userDevice', i);
      }
    }

    localStorage.setItem(userText.name, userText.value);
  } else {
    localStorage.clear();
  }
}

// Form check
var form = document.querySelector('.contest__form');

btn_submit.addEventListener('click', FormCheck);

function FormCheck() {
  if (form.checkValidity()) {
    btn_submit.preventDefault();
    moduleControl.confirm.open();
  } else {
    let inputRequired = document.querySelectorAll('input[required]');
    let k = 0;

    for (let i = 0; i < inputRequired.length; i++) {
      if (inputRequired[i].validity.valueMissing) {
        moduleControl.error.open();
      }
    }
  }
}
