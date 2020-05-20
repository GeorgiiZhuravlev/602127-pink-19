// Define header for index.html (because of promo)
var headerIndex = document.querySelector('.header.index');

// Define promo application download
var appDownload = document.querySelector('.app-download');

// Define header elements
var headerElements = [
  document.querySelector('.header-upside__menu'),
  document.querySelector('.header-upside__nav-btn'),
  document.querySelector('.header-upside__nav')
]
var headerMenu = document.querySelector('.header-upside__menu');
var headerBtn = document.querySelector('.header-upside__nav-btn');
var headerNav = document.querySelector('.header-upside__nav');

// Media-query
var currentLocation = document.location.href;
var body = document.body;

function Resize() {
  if (currentLocation === 'http://localhost:3000/' || currentLocation === 'http://localhost:3000/index.html') {
    if (document.body.clientWidth <= 659) {
      headerIndex.style.paddingBottom = '272px';
      appDownload.style.top = '459px';

      if (headerMenu.classList.contains('opened')) {
        appDownload.style.top = '721px';
      } else if (headerMenu.classList.contains('closed')) {
        appDownload.style.top = '459px';
      }
    } else {
      headerIndex.style.paddingBottom = '0';
    }
  }

  window.addEventListener('resize', Resize);
}

// Set default (progressive)
window.addEventListener('load', Closed);

// Menu control
headerBtn.addEventListener('click', Toggle);
function Toggle() {
  if (headerMenu.classList.contains('closed')) {
    Opened();
  } else if (headerMenu.classList.contains('opened')) {
    Closed();
  }
}

// Closed menu
function Closed() {
  for (let i = 0; i < headerElements.length; i++) {
    headerElements[i].classList.remove('opened');
    headerElements[i].classList.add('closed');
  }

  Resize();
}

// Opened menu
function Opened() {
  for (let i = 0; i < headerElements.length; i++) {
    headerElements[i].classList.remove('closed');
    headerElements[i].classList.add('opened');
  }

  Resize();
}
