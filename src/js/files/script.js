// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import Lenis from 'lenis'
import SplitType from 'split-type'

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

window.addEventListener("load", function () {
  const heroSec = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero__video');
  if (heroSec) {
    setTimeout(() => {
      heroSec.classList.add('loaded');
    }, 0);
    setTimeout(() => {
      heroSec.classList.add('step-1');
    }, 600);
    setTimeout(() => {
      heroSec.classList.add('step-2');
    }, 1200);
    setTimeout(() => {
      heroSec.classList.add('step-3');
      if (heroVideo) {
        heroVideo.play();
      }
    }, 3800);


    setTimeout(() => {
      document.documentElement.classList.remove('lock-body');
    }, 1500);

  } else {

    setTimeout(() => {
      document.documentElement.classList.remove('lock-body');
    }, 0);

  }


});

window.addEventListener('DOMContentLoaded', () => {

  // == SplitType ======================================  
  const splitTextLines = document.querySelectorAll('.split-lines');
  const splitTextWords = document.querySelectorAll('.split-words');
  const splitTextChars = document.querySelectorAll('.split-chars');
  const splitTextBoth = document.querySelectorAll('.split-both');
  const splitSetSpan = document.querySelectorAll('.split-words.set-span');
  
  function initSplitType() {
    // Если существуют элементы с классом .split-lines
    if (splitTextLines.length > 0) {
      splitTextLines.forEach(element => {
        new SplitType(element, { types: 'lines' });
      });
    }
  
    // Если существуют элементы с классом .split-words
    if (splitTextWords.length > 0) {
      splitTextWords.forEach(element => {
        new SplitType(element, { types: 'words' });
  
        // Проставляем индексы для всех слов
        const words = element.querySelectorAll('.word');
        words.forEach((word, index) => {
          word.style.setProperty('--index', index);
        });
      });
    }
  
    // Если существуют элементы с классом .split-chars
    if (splitTextChars.length > 0) {
      splitTextChars.forEach(element => {
        new SplitType(element, { types: 'chars' });
  
        const chars = element.querySelectorAll('.char');
        chars.forEach((char, index) => {
          char.style.setProperty('--index', index);
        });
      });
    }
  
    // Если существуют элементы с классом .split-both
    if (splitTextBoth.length > 0) {
      splitTextBoth.forEach(element => {
        new SplitType(element, { types: 'lines, words' });
  
        // Проставляем индексы для всех слов
        const words = element.querySelectorAll('.word');
        words.forEach((word, index) => {
          word.style.setProperty('--index', index);
        });
      });
    }
  
    // Добавляем <span> для каждого слова внутри .split-words.set-span
    if (splitSetSpan.length > 0) {
      splitSetSpan.forEach(splitSetSpan => {
        const words = splitSetSpan.querySelectorAll('.word');
        
        words.forEach(word => {
          const text = word.textContent.trim();
          word.innerHTML = `<span class="word-span">${text}</span>`;
        });
      });
    }
  }
  
  initSplitType();
  // =============================================

});
