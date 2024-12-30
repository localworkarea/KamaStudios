// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, bodyLockStatus, bodyLock, bodyUnlock  } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

import Lenis from 'lenis'
import SplitType from 'split-type'

const heroSection = document.querySelector('.hero');
const projectsSection = document.querySelector('.projects');
if (heroSection) {
  document.documentElement.classList.add('index-page');
}
if (projectsSection) {
  document.documentElement.classList.add('projects-page');
}

// Initialize Lenis
const lenis = new Lenis({
  lerp: 0.1,             // Определяет инерцию (чем ближе к 1, тем медленнее скролл)
  // mouseMultiplier: 1,    // Чувствительность прокрутки мыши (увеличивайте, чтобы сделать скролл быстрее)
})
const indexPage = document.querySelector('.index-page');

if (indexPage) {
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
} else {
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
}

window.addEventListener("load", function () {
  const heroSec = document.querySelector('.hero');
  const heroBody = document.querySelector('.hero__body');
  const heroVideo = document.querySelector('.hero__video');
  if (heroSec) {
    setTimeout(() => {
      heroBody.classList.add('loaded');
    }, 0);
    setTimeout(() => {
      heroBody.classList.add('step-1');
    }, 600);
    setTimeout(() => {
      heroBody.classList.add('step-2');
    }, 1200);
    setTimeout(() => {
      heroBody.classList.add('step-3');
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

  if (indexPage) {
    ScrollTrigger.refresh();
    
    function createGSAPanim() {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      const infoHero = document.querySelector('.info-hero');
      const infoHeroTxt = document.querySelector('.info-hero__txt');
      const infoHeroWords = document.querySelectorAll('.info-hero__txt .word');
  
      if (infoHeroWords.length > 0) {
        gsap.to(infoHeroWords, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: infoHero,
            start: "top 70%",
            end: "110% bottom",
            scrub: true,
            // markers: true,
          },
        });
      }
  
    }
    createGSAPanim();
  }


  const spollers = document.querySelectorAll('[data-spoller]');
  if (spollers.length) {
      spollers.forEach(spoller => {
          // Получаем дочерние элементы с data-spoller-item
          const spollerItems = spoller.querySelectorAll('[data-spoller-item]');
          if (spollerItems.length) {
              spollerItems.forEach(item => {
                  const spollerBody = item.querySelector('.spoller-body');
                  if (spollerBody) {
                      // Вычисляем высоту содержимого spoller-body
                      const updateHeight = () => {
                          const bodyHeight = spollerBody.scrollHeight;
                          item.style.setProperty('--height-item', `${bodyHeight}px`);
                      };
  
                      if (isMobile.any()) {
                          // Логика для мобильных устройств (клик)
                          item.addEventListener('click', () => {
                              const isActive = item.classList.contains('_active');
  
                              // Закрываем все остальные элементы, если нужно
                              spollerItems.forEach(otherItem => {
                                  if (otherItem !== item) {
                                      otherItem.classList.remove('_active');
                                      otherItem.style.setProperty('--height-item', `0px`);
                                  }
                              });
  
                              // Переключаем состояние текущего элемента
                              if (isActive) {
                                  item.classList.remove('_active');
                                  item.style.setProperty('--height-item', `0px`);
                              } else {
                                  updateHeight();
                                  item.classList.add('_active');
                              }
                          });
                      } else {
                          // Логика для десктопов (ховер)
                          item.addEventListener('mouseenter', () => {
                              updateHeight();
                              item.classList.add('_active');
                          });
  
                          item.addEventListener('mouseleave', () => {
                              item.classList.remove('_active');
                          });
  
                          // Обновление высоты при изменении содержимого
                          new ResizeObserver(() => updateHeight()).observe(spollerBody);
                      }
                  }
              });
          }
      });
  }


  function updateTeamPicturePadding() {
    const teamBlock = document.querySelector('.team__block');
    const teamPicture = document.querySelector('.team__picture');
    
    if (teamBlock && teamPicture) {
      const blockHeight = teamBlock.offsetHeight;
      teamPicture.style.setProperty('--padding-bottom', `${blockHeight}px`);
    }
  }
  updateTeamPicturePadding();


  const popups = document.querySelectorAll("[data-popup]");
  if (popups.length > 0) {
    // Открытие попапа
    popups.forEach(trigger => {
      trigger.addEventListener("click", event => {
        event.preventDefault();
        const popupId = trigger.getAttribute("data-popup");
        const popup = document.querySelector(popupId);

        if (popup) {
          // Удаляем класс menu-open, если он есть
          if (document.documentElement.classList.contains("menu-open")) {
            setTimeout(() => {
              document.documentElement.classList.remove("menu-open");
            }, 500);
          }

          document.documentElement.classList.add("popup-show");
          popup.classList.add("popup_show");
          bodyLock(); // Блокировка страницы
        } else {
          console.error(`Попап с id ${popupId} не найден.`);
        }
      });
    });
  }

  // Закрытие попапа
  const closeButtons = document.querySelectorAll("[data-close]");
  if (closeButtons.length > 0) {
    closeButtons.forEach(closeButton => {
      closeButton.addEventListener("click", () => {
        const popup = closeButton.closest(".popup");
        if (popup) {
          document.documentElement.classList.remove("popup-show");
          popup.classList.remove("popup_show");
          bodyUnlock(); 
        }
      });
    });
  }

  // Закрытие попапа при клике вне его контента
  const allPopups = document.querySelectorAll(".popup");
  if (allPopups.length > 0) {
    allPopups.forEach(popup => {
      popup.addEventListener("click", event => {
        if (!event.target.closest(".popup__content")) {
          document.documentElement.classList.remove("popup-show");
          popup.classList.remove("popup_show");
          bodyUnlock();
        }
      });
    });
  }

// // Инициализация GSAP тикеров
// const tickers = document.querySelectorAll("[data-ticker]");

// if (tickers.length > 0) {
//   tickers.forEach(ticker => {
//     // Чтение атрибутов
//     const speed = parseFloat(ticker.getAttribute("data-ticker-speed")) || 5; // Скорость в секундах
//     const direction = ticker.getAttribute("data-ticker-dir") === "rtl" ? -1 : 1; // Направление

//     // Клонирование первого дочернего элемента
//     const firstChild = ticker.firstElementChild;
//     if (firstChild) {
//       const clone = firstChild.cloneNode(true);
//       ticker.appendChild(clone);

//       // Расчет ширины контента для расчета движения
//       const contentWidth = firstChild.offsetWidth;

//       // Создание стандартной анимации с GSAP
//       let tickerAnim = gsap.fromTo(
//         [firstChild, clone],
//         { xPercent: direction === -1 ? -100 : 0 },
//         {
//           xPercent: direction === -1 ? 0 : -100,
//           duration: speed, // Используем значение в секундах
//           ease: "none",
//           repeat: -1,
//         }
//       );

//       let isScrolling = false;
//       let scrollPauseTimeout; // Таймер для паузы после скролла

//       ScrollTrigger.create({
//         trigger: ticker,
//         start: "top center",
//         end: "bottom top",
//         onUpdate: (self) => {
//           if (!self.isActive) return;

//           const scrollVelocity = self.getVelocity();
//           const additionalSpeed = scrollVelocity * 0.0005 * direction;

//           // Остановка анимации при скролле
//           if (!isScrolling) {
//             isScrolling = true;
//             tickerAnim.pause();
//           }

//           // Обновление текущей позиции
//           gsap.set([firstChild, clone], {
//             xPercent: (i, target) => {
//               let currentPercent = gsap.getProperty(target, "xPercent");

//               // Придерживаемся логики
//               if (direction === -1) {
//                 if (currentPercent >= 0) {
//                   currentPercent = -100; // Сбрасываем на -100%
//                 } else if (currentPercent < -100) {
//                   currentPercent = 0; // Циклически возвращаем на 0%
//                 }
//               } else {
//                 if (currentPercent <= -100) {
//                   currentPercent = 0; // Сбрасываем на 0%
//                 } else if (currentPercent > 0) {
//                   currentPercent = -100; // Циклически возвращаем на -100%
//                 }
//               }

//               return currentPercent + additionalSpeed; // Добавляем скорость скролла
//             },
//           });

//           // Устанавливаем паузу перед возобновлением анимации
//           clearTimeout(scrollPauseTimeout);
//           scrollPauseTimeout = setTimeout(() => {
//             if (!self.isDragging) {
//               // Ручная установка позиции перед возобновлением
//               const currentPercentFirst = gsap.getProperty(firstChild, "xPercent");
//               const currentPercentClone = gsap.getProperty(clone, "xPercent");

//               tickerAnim.kill(); // Полностью убиваем текущую анимацию
//               gsap.set(firstChild, { xPercent: currentPercentFirst });
//               gsap.set(clone, { xPercent: currentPercentClone });

//               // Создаём новую анимацию с текущих позиций
//               const remainingDistance = direction === -1
//                 ? Math.abs(currentPercentFirst)
//                 : 100 - Math.abs(currentPercentFirst);
//               const newDuration = (remainingDistance / 100) * speed;

//               tickerAnim = gsap.fromTo(
//                 [firstChild, clone],
//                 { xPercent: currentPercentFirst },
//                 {
//                   xPercent: direction === -1 ? 0 : -100,
//                   duration: newDuration,
//                   ease: "none",
//                   repeat: -1,
//                 }
//               );

//               tickerAnim.timeScale(1); // Восстанавливаем стандартную скорость

//               isScrolling = false;
//             }
//           }, 100); // Настраиваемая пауза
 
//         },
//         onLeave: () => {
//           isScrolling = false;
//           tickerAnim.resume();
//         },
//         onEnterBack: () => {
//           isScrolling = false;
//           tickerAnim.resume();
//         },
//       });
//     }
//   });
// }


// // Инициализация GSAP тикеров
// const tickers = document.querySelectorAll("[data-ticker]");

// if (tickers.length > 0) {
//   tickers.forEach(ticker => {
//     // Чтение атрибутов
//     const speed = parseFloat(ticker.getAttribute("data-ticker-speed")) || 5; // Скорость в секундах
//     const direction = ticker.getAttribute("data-ticker-dir") === "rtl" ? -1 : 1; // Направление

//     // Клонирование первого дочернего элемента
//     const firstChild = ticker.firstElementChild;
//     if (firstChild) {
//       const clone = firstChild.cloneNode(true);
//       ticker.appendChild(clone);

//       // Расчет ширины контента для расчета движения
//       const contentWidth = firstChild.offsetWidth;

//       // Создание стандартной анимации с GSAP
//       let tickerAnim = gsap.fromTo(
//         [firstChild, clone],
//         { xPercent: direction === -1 ? -100 : 0 },
//         {
//           xPercent: direction === -1 ? 0 : -100,
//           duration: speed, // Используем значение в секундах
//           ease: "none",
//           repeat: -1,
//         }
//       );

//       let isScrolling = false;
//       let scrollPauseTimeout; // Таймер для паузы после скролла

//       ScrollTrigger.create({
//         trigger: ticker,
//         start: "top bottom",
//         end: "bottom top",
//         onUpdate: (self) => {
//           if (!self.isActive) return;

//           const scrollVelocity = self.getVelocity();
//           const additionalSpeed = scrollVelocity * 0.0005 * direction;

//           // Остановка анимации при скролле
//           if (!isScrolling) {
//             isScrolling = true;
//             tickerAnim.pause();
//           }

//           // Обновление текущей позиции
//           gsap.set([firstChild, clone], {
//             xPercent: (i, target) => {
//               let currentPercent = gsap.getProperty(target, "xPercent") % 100;

//               // Придерживаемся логики
//               if (direction === -1) {
//                 if (currentPercent >= 0) {
//                   currentPercent = -100; // Сбрасываем на -100%
//                 } else if (currentPercent < -100) {
//                   currentPercent = 0; // Циклически возвращаем на 0%
//                 }
//               } else {
//                 if (currentPercent <= -100) {
//                   currentPercent = 0; // Сбрасываем на 0%
//                 } else if (currentPercent > 0) {
//                   currentPercent = -100; // Циклически возвращаем на -100%
//                 }
//               }

//               return currentPercent + additionalSpeed; // Добавляем скорость скролла
//             },
//           });

//           // Устанавливаем паузу перед возобновлением анимации
//           clearTimeout(scrollPauseTimeout);
//           scrollPauseTimeout = setTimeout(() => {
//             if (!self.isDragging) {
//               // Ручная установка позиции перед возобновлением
//               const currentPercentFirst = gsap.getProperty(firstChild, "xPercent") % 100;
//               const currentPercentClone = gsap.getProperty(clone, "xPercent") % 100;

//               tickerAnim.kill(); // Полностью убиваем текущую анимацию
//               gsap.set(firstChild, { xPercent: currentPercentFirst });
//               gsap.set(clone, { xPercent: currentPercentClone });

//               // Создаём новую анимацию с текущих позиций
//               const remainingDistance = direction === -1
//                 ? Math.abs(currentPercentFirst)
//                 : 100 - Math.abs(currentPercentFirst);
//               const newDuration = (remainingDistance / 100) * speed;

//               tickerAnim = gsap.fromTo(
//                 [firstChild, clone],
//                 { xPercent: currentPercentFirst },
//                 {
//                   xPercent: direction === -1 ? 0 : -100,
//                   duration: newDuration,
//                   ease: "none",
//                   repeat: -1,
//                 }
//               );

//               tickerAnim.timeScale(1); // Восстанавливаем стандартную скорость

//               isScrolling = false;
//             }
//           }, 100); // Настраиваемая пауза
//         },
//         onLeave: () => {
//           isScrolling = false;
//           tickerAnim.resume();
//         },
//         onEnterBack: () => {
//           isScrolling = false;
//           tickerAnim.resume();
//         },
//       });
//     }
//   });
// }


  // const tickers = document.querySelectorAll("[data-ticker]");

  // tickers.forEach((ticker) => {
  //   const speed = parseFloat(ticker.dataset.tickerSpeed) || 15; // Скорость анимации
  //   const direction = ticker.dataset.tickerDir || "rtl"; // Направление
  //   const list = ticker.querySelector(".ticker__list");

  //   // Клонируем список для бесконечного эффекта
  //   const clone = list.cloneNode(true);
  //   ticker.appendChild(clone);

  //   // Общая ширина списков
  //   const listWidth = list.offsetWidth;

  //   // Настройка анимации
  //   const animate = () => {
  //     const keyframes = [
  //       { transform: `translateX(${direction === "rtl" ? 0 : -listWidth}px)` },
  //       { transform: `translateX(${direction === "rtl" ? -listWidth : 0}px)` },
  //     ];

  //     const options = {
  //       duration: speed * 1000, // Длительность из атрибута скорости
  //       iterations: Infinity, // Бесконечная анимация
  //       easing: "linear", // Линейное движение
  //     };

  //     list.animate(keyframes, options);
  //     clone.animate(keyframes, options);
  //   };

  //   animate();
  // });



  
//   function e(defaultValue, value) {
//     return value !== null ? (value === "true" ? true : value === "false" ? false : value) : defaultValue;
// }

// function initTrMarquee() {
//     document.querySelectorAll("[tr-marquee-element='component']").forEach(function(component) {
//         const panel = component.querySelector("[tr-marquee-element='panel']");
//         const triggerHover = component.querySelector("[tr-marquee-element='triggerhover']");
//         const triggerClick = component.querySelector("[tr-marquee-element='triggerclick']");

//         const speed = e(100, component.getAttribute("tr-marquee-speed"));
//         const isVertical = e(false, component.getAttribute("tr-marquee-vertical"));
//         const isReverse = e(false, component.getAttribute("tr-marquee-reverse"));
//         const scrollDirection = e(false, component.getAttribute("tr-marquee-scrolldirection"));
//         const scrollScrub = e(false, component.getAttribute("tr-marquee-scrollscrub"));
        
//         let p = -100;
//         let m = 1;
//         let paused = false;
        
//         if (isReverse) {
//             p = 100;
//         }

//         const gsapTimeline = gsap.timeline({ repeat: -1, onReverseComplete: () => gsapTimeline.progress(1) });

//         if (isVertical) {
//             gsapTimeline.fromTo(panel, { yPercent: 0 }, { yPercent: p, ease: "none", duration: speed });
//         } else {
//             gsapTimeline.fromTo(panel, { xPercent: 0 }, { xPercent: p, ease: "none", duration: speed });
//         }

//         const timeScale = { value: 1 };

//         ScrollTrigger.create({
//             trigger: "tickers",
//             start: "top bottom",
//             end: "bottom bottom",
//             onUpdate: (e) => {
//                 if (!paused && scrollDirection && m !== e.direction) {
//                     m = e.direction;
//                     gsapTimeline.timeScale(e.direction);
//                 }

//                 if (scrollScrub) {
//                     let velocity = 0.006 * e.getVelocity();
//                     velocity = gsap.utils.clamp(-20, 20, velocity);
//                     gsap.timeline({ onUpdate: () => gsapTimeline.timeScale(timeScale.value) }).fromTo(timeScale, { value: velocity }, { value: m, duration: 0.5 });
//                 }
//             }
//         });


     

//         function togglePaused(status) {
//             paused = status;
//             let timeline = gsap.timeline({ onUpdate: () => gsapTimeline.timeScale(timeScale.value) });
//             timeline.fromTo(timeScale, { value: status ? m : 0 }, { value: status ? 0 : m, duration: 0.5 });
//             triggerClick.classList.toggle("is-paused", !status);
//         }
//     });
// }

// initTrMarquee();


  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    
    if (currentWidth !== lastWidth) {

      updateTeamPicturePadding();

      lastWidth = currentWidth;
    }
  });


});



// // Инициализация GSAP тикеров
// const tickers = document.querySelectorAll("[data-ticker]");

// if (tickers.length > 0) {
//   tickers.forEach(ticker => {
//     // Чтение атрибутов
//     const speed = parseFloat(ticker.getAttribute("data-ticker-speed")) || 5; // Скорость в секундах
//     const direction = ticker.getAttribute("data-ticker-dir") === "rtl" ? -1 : 1; // Направление

//     const firstChild = ticker.firstElementChild;
//     if (firstChild) {
//       const clone = firstChild.cloneNode(true);
//       ticker.appendChild(clone);

//       let tickerAnim;
//       let isScrolling = false;
//       let scrollPauseTimeout;

//       // Функция обновления позиции вручную
//       const updatePosition = (scrollVelocity) => {
//         const additionalSpeed = scrollVelocity * 0.0005 * direction;

//         // Обновляем `xPercent` вручную
//         gsap.set([firstChild, clone], {
//           xPercent: (i, target) => {
//             let currentPercent = gsap.getProperty(target, "xPercent");

//             if (direction === -1) {
//               currentPercent = (currentPercent + additionalSpeed) % 100;
//               if (currentPercent > 0) currentPercent = -100;
//             } else {
//               currentPercent = (currentPercent + additionalSpeed) % 100;
//               if (currentPercent < -100) currentPercent = 0;
//             }

//             return currentPercent;
//           },
//         });
//       };

//       // Создание анимации
//       const createTickerAnimation = (startPercent) => {
//         tickerAnim = gsap.fromTo(
//           [firstChild, clone],
//           { xPercent: startPercent },
//           {
//             xPercent: direction === -1 ? 0 : -100,
//             duration: speed,
//             ease: "none",
//             repeat: -1,
//           }
//         );
//       };

//       // Начальная анимация
//       createTickerAnimation(direction === -1 ? -100 : 0);

//       ScrollTrigger.create({
//         trigger: ticker,
//         start: "top bottom",
//         end: "bottom top",
//         onUpdate: (self) => {
//           if (!self.isActive) return;

//           const scrollVelocity = self.getVelocity();

//           // Пауза анимации при скролле
//           if (!isScrolling) {
//             isScrolling = true;
//             tickerAnim.pause();
//           }

//           // Обновление позиции вручную
//           updatePosition(scrollVelocity);

//           // Возобновление анимации после скролла
//           clearTimeout(scrollPauseTimeout);
//           scrollPauseTimeout = setTimeout(() => {
//             if (!self.isDragging) {
//               const currentPercentFirst = gsap.getProperty(firstChild, "xPercent") % 100;
//               const currentPercentClone = gsap.getProperty(clone, "xPercent") % 100;

//               gsap.set(firstChild, { xPercent: currentPercentFirst });
//               gsap.set(clone, { xPercent: currentPercentClone });

//               tickerAnim.kill(); // Удаляем старую анимацию
//               createTickerAnimation(currentPercentFirst); // Создаём новую с текущей позиции
//               isScrolling = false;
//             }
//           }, 100);
//         },
//         onLeave: () => {
//           isScrolling = false;
//           tickerAnim.resume();
//         },
//         onEnterBack: () => {
//           isScrolling = false;
//           tickerAnim.resume();
//         },
//       });
//     }
//   });
// }



// // // Ticker =================================
const tickers = document.querySelectorAll("[data-ticker]");
if (tickers.length > 0) {
  tickers.forEach(ticker => {
    // Получаем скорость и направление из атрибутов data-ticker-speed и data-ticker-dir
    const speed = ticker.getAttribute("data-ticker-speed") || 80;
    const direction = ticker.getAttribute("data-ticker-dir") || "ltr";

    // Берем первый дочерний элемент тикера
    const firstChild = ticker.firstElementChild;
    if (firstChild) {
      const clone = firstChild.cloneNode(true);
      ticker.appendChild(clone);

      Array.from(ticker.children).forEach(child => {
        const animationName = direction === "rtl" ? "scroll" : "scroll-rev";
        child.style.animation = `${animationName} ${speed}s linear infinite`;
      });
    }
  });
}
// // // ====================================================



