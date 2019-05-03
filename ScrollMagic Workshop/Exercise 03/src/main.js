import { TweenMax, TimelineMax } from 'gsap';
import 'gsap/TextPlugin';
import ScrollMagic from "scrollmagic";
import "animation.gsap"; // Added as alias in webpack conf
import "debug.addIndicators"; // Added as alias in webpack conf

// Initialize Controller
const controller = new ScrollMagic.Controller();
const navTl = new TimelineMax()

// Variables
const navItem = document.querySelectorAll('.nav-items li:not(.active)'),
  navTrigger = document.querySelectorAll('.nav-trigger'),
  navTriggerDown = document.querySelectorAll('.slide-pos'),
  navTriggerUp = document.querySelectorAll('.slide-pos-reverse'),
  triggersDown = [],
  triggersUp = [],
  slideIn = document.querySelector('.slide.active'),
  logo = document.querySelector('.logo'),
  main = document.querySelector('#main'),
  body = document.body,
  slide = document.querySelectorAll('.slide'),
  nav = document.querySelector('nav');

// Triggers on the way down
navTriggerDown.forEach((element, index) => {
  const id = `#${element.id}`;
  triggersDown.push(id);
})

// Triggers on the way up
navTriggerUp.forEach((element, index) => {
  const id = `#${element.id}`;
  triggersUp.push(id);
})

// Scene 1 - pin our main section
var pinScene01 = new ScrollMagic.Scene({
  triggerElement: '#main',
  triggerHook: 0,
  duration: '900%'
})
.setPin("#main .pin-wrapper", { pushFollowers: false })
.addTo(controller);

navItem.forEach((element) => {
  const slideHref = element.querySelector('a').getAttribute('href'),
    slideId = slideHref.split('#')[1],
    navActive = document.querySelector('.nav-active'),
    moveNav = TweenMax.to(navActive, 1, { x: '+=26', ease: Linear.easeNone })

  navTl.add(moveNav, slideId);
})

// Scene 2
var navScene = new ScrollMagic.Scene({
  triggerElement: navTrigger,
  duration: '800%'
})
.setTween(navTl)
.addTo(controller);

// Scene 3
triggersDown.forEach((triggerDown, index) => {
  const triggerTransitionToNext = new ScrollMagic.Scene({
    triggerElement: triggerDown,
    triggerHook: 0.6,
  })
  .on("enter", (e) => {
    //console.log('crossfade to next', triggerDown);
    const slideActive = document.querySelector('.slide.active'),
      slideIndex = triggerDown.substring(6, 8),
      slideIn = document.querySelector(`#slide${slideIndex}`),
      direction = e.scrollDirection;

    crossFade(slideActive, slideIn, direction, slideIndex);
  })
  //.addIndicators({
  //  name: "triggerDown",
  //  indent: 520,
  //  colorStart: 'yellow',
  //  colorTrigger: 'yellow'
  //})
  .addTo(controller);
})

// Scene 4
triggersUp.forEach((triggerUp, index) => {
  const triggerTransitionToPrev = new ScrollMagic.Scene({
    triggerElement: triggerUp,
    triggerHook: 0.49,
  })
  .on("leave", (e) => {
    //console.log('crossfade to next', triggerUp);
  })
  //.addIndicators({
  //  name: "triggerUp",
  //  indent: 110,
  //  colorStart: 'black',
  //  colorTrigger: 'black'
  //})
  .addTo(controller);
})

const updateNav = (slideOutId, slideInId) => {
  const navItemsLi = document.querySelectorAll('.nav-items li');
  navItemsLi.forEach((element, index) => {
    element.classList.remove('active');
  });
  const navItems = document.querySelector(`.nav-items li.nav-item${slideInId}`);
  TweenMax.set(navItems, { className: '+=active' })
}


const updateValue = (tl, slideInValue, slideInNumber) => {
  const newValue = parseInt(tl.progress() * slideInValue);

  //console.log(slideInValue);
  //console.log(slideInNumber.text(newValue));

  if (slideInValue == 100) {
    //slideInNumber.text(newValue)
  } else {
    //slideInNumber.text(`${newValue}%`)
  }
}

const crossFade = (slideOut, slideIn, direction, slideIndex) => {
  const slideOutId = slideOut.id.substring(5, 7),
    slideInId = slideIn.id.substring(5, 7),
    slideOutBcg = slideOut.querySelector('bcg-color'),
    slideOutTitle = slideOut.querySelectorAll('.title .fade-txt'),
    slideOutNumber = slideOut.querySelector('.number'),
    slideInBcg = slideIn.querySelector('bcg-color'),
    slideInTitle = slideIn.querySelectorAll('.title .fade-txt'),
    slideInNumber = slideIn.querySelector('.number'),
    slideInBcgWhite = slideIn.querySelector('.primary .bcg');

  updateNav(slideOutId, slideInId);

  TweenMax.set(slide, { className: '-=active' });
  TweenMax.set(document.querySelector(`#slide${slideIndex}`), { className: '+=active' });

  const crossFadeTl = new TimelineMax(),
    countUpText = new TimelineMax({ paused: true }),
    countUpTl = new TimelineMax();

  crossFadeTl
  .set(slideIn, { autoAlpha: 1 })
  .set([slideInTitle, slideInNumber, slideInBcgWhite], { autoAlpha: 0 })
  .to([slideOutTitle, slideOutNumber], 0.3, { autoAlpha: 0, ease: Linear.easeNone })
  .set(main, { className: `slide${slideInId}-active` })
  .set(slideInNumber, { text: '0' })
  .to(slideInNumber, 1.2, { autoAlpha: 1, ease: Linear.easeNone })
  .add('countingUp')

  countUpText
  .to(slideInNumber, 1.2,
    {
      autoAlpha: 1,
      ease: Linear.easeNone,
      onUpdate: updateValue,
      onUpdateParams: [
        '{self}',
        95,
        slideInNumber
      ]
    })

  countUpTl.to(countUpText, 1, { progress: 1, ease: Power3.easeOut })

  crossFadeTl.add(countUpText, 'countingUp')

}

// Animate Slide In
const animationIn = (slideIn) => {
  const slideInNumber = slideIn.querySelector('.number'),
    slideInTitle = slideIn.querySelectorAll('.fade-txt'),
    primaryBcg = slideIn.querySelector('.primary .bcg'),
    whiteBcg = slideIn.querySelector('.bcg-white'),
    transitionInTl = new TimelineMax();

  transitionInTl
  .set([slide, slideInNumber, nav, logo], { autoAlpha: 0 })
  .set(slideIn, { autoAlpha: 1 })
  .set(whiteBcg, { scaleX: 1 })
  .set(primaryBcg, { scaleX: 0 })
  .to(whiteBcg, 0.4, { scaleX: 0.63, ease: Power2.easeIn })
  .to(primaryBcg, 0.4, { scaleX: 1, ease: Power2.easeOut, clearProps: 'all' }, '+=0.1')
  .add('fadeInLogo')
  .to(whiteBcg, 0.6, { scaleX: 0, ease: Power4.easeIn }, 'fadeInLogo+=0.3')
  .to([logo, slideInNumber], 0.2, { autoAlpha: 1, ease: Linear.easeNone }, 'fadeInLogo-=0.2')
  .staggerFrom(slideInTitle, 0.3, { autoAlpha: 0, x: '-=60', ease: Power1.easeOut }, 0.1, 'fadeInLogo+=0.7')
  .fromTo(nav, 0.3, { y: -15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power1.easeOut }, 'fadeInLogo+=0.9');

}

const init = () => {
  setTimeout(() => {
    TweenMax.set(body, { autoAlpha: 1 })
    animationIn(slideIn);
  }, 500)
}

init();