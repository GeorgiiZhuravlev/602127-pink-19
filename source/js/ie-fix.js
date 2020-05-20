// Устанавливаем паттерны для определения движка IE.
function IEFix() {
  const pattern1 = /trident/gi;
  const pattern2 = /msie/gi;

  // Определяем браузер IE. Если истина - запускаем скрипты.
  if (pattern1.test(navigator.userAgent) || pattern2.test(navigator.userAgent)) {
    console.log('Java-Script подключен. | ie-fix');
    HoverFix();
  } else {
    console.log('Java-Script отключен. | ie-fix');
  }

  function HoverFix() {
    let inputEditor = document.querySelectorAll('.editor__switcher');

    for (let j = 0; j < inputEditor.length; j++) {
      inputEditor[j].onclick = SetBtnStatus;
    }

    function SetBtnStatus() {
      let btnEditor = document.querySelectorAll('.editor__switcher:not(:checked) ~ .editor__btn');
      let btnEditorCurrent = document.querySelector('.editor__switcher:checked ~ .editor__btn');

      btnEditorCurrent.onmouseover = '';
      btnEditorCurrent.onmouseout = '';
      btnEditorCurrent.querySelector('svg').style.opacity = '1';

      for (let i = 0; i < btnEditor.length; i++) {
        btnEditor[i].querySelector('svg').style.opacity = '0.3';

        btnEditor[i].onmouseover = function (evt) {
          let svgEditor = evt.currentTarget.querySelector('svg');
          svgEditor.style.opacity = '0.5';
        }

        btnEditor[i].onmouseout = function (evt) {
          let svgEditor = evt.currentTarget.querySelector('svg');
          svgEditor.style.opacity = '0.3';
        }
      }
    }

    SetBtnStatus();
  }
}

IEFix();
