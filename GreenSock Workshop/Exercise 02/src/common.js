import * as main from './main.js';
import { TimelineLite, TweenLite } from 'gsap';

// Utils
export const indexOfParent = (element) => {
  return [...element.parentNode.children].indexOf(element);
}

export const init = () => {
  // Set active slide visible
  //TweenLite.set(main.slideActive, { y: '0%' })
  TweenLite.set(main.slideActive, { x: '0%' })

  // Fade slides in
  TweenLite.set(main.body, { className: '-=loading' })
}

// Scroll Animation
export const scrollToSection = (sectionFrom, sectionTo) => {
  const tlDown = new TimelineLite({ onComplete: setActiveSection, onCompleteParams: [sectionFrom, sectionTo] }),
    tlUp = new TimelineLite(),
    tlRight = new TimelineLite({ onComplete: setActiveSection, onCompleteParams: [sectionFrom, sectionTo] }),
    tlLeft = new TimelineLite();

  const heading = sectionTo.querySelector('h1'),
    subheading = sectionTo.querySelector('p'),
    bcg = sectionTo.querySelector('.bcg'),
    bcgFrom = sectionFrom.querySelector('.bcg'),
    body = main.body;

  // Vertical Version
  //if (indexOfParent(sectionFrom) < indexOfParent(sectionTo)) {
  //  tlDown
  //  .set(body, { className: '+=is-animating' })
  //  .to(sectionFrom, 1.2, { y: '-=100%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
  //  .to(sectionTo, 1.2, { y: '0%', ease: Power4.easeInOut }, '0')
  //  .to(bcgFrom, 1.2, { y: '30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
  //  .from(bcg, 1.2, { y: '-30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
  //  .from(heading, 0.7, { autoAlpha: 0, y: 40, ease: Power4.easeInOut }, '-=1')
  //  .from(subheading, 0.7, { autoAlpha: 0, y: 40, ease: Power4.easeInOut }, '-=0.6')
  //  .set(body, { className: '-=is-animating' })
  //} else {
  //  tlUp
  //  .set(body, { className: '+=is-animating' })
  //  .set(sectionTo, { y: '-100%' })
  //  .to(sectionFrom, 1.2, { y: '100%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
  //  .to(sectionTo, 1.2, { y: '0%', ease: Power4.easeInOut }, '0')
  //  .to(bcgFrom, 1.2, { y: '-30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
  //  .from(bcg, 1.2, { y: '30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
  //  .from(heading, 0.7, { autoAlpha: 0, y: 40, ease: Power4.easeInOut }, '-=1')
  //  .from(subheading, 0.7, { autoAlpha: 0, y: 40, ease: Power4.easeInOut }, '-=0.6')
  //  .set(body, { className: '-=is-animating' })
  //}

  // Horizontal Version
  if (indexOfParent(sectionFrom) < indexOfParent(sectionTo)) {
    tlRight
    .set(body, { className: '+=is-animating' })
    .set(sectionTo, { scale: 0.9 })
    .to(sectionFrom, 0.6, { scale: 0.9 })
    .to(sectionFrom, 1.2, { x: '-100%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
    .to(sectionTo, 1.2, { x: '0%', ease: Power4.easeInOut }, '0')
    .to(bcgFrom, 1.2, { x: '30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
    .from(bcg, 1.2, { x: '-30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
    .to(sectionTo, 0.5, { scale: 1 }, '-=0.4')
    .from(heading, 0.7, { autoAlpha: 0, x: '+=40', ease: Power4.easeInOut }, '-=0.7')
    .from(subheading, 0.7, { autoAlpha: 0, x: '+=40', ease: Power4.easeInOut }, '-=0.5')
    .set(body, { className: '-=is-animating' })
  } else {
    tlLeft
    .set(body, { className: '+=is-animating' })
    .set(sectionTo, { scale: 0.9 })
    .set(sectionTo, { x: '-100%' })
    .to(sectionFrom, 0.6, { scale: 0.9 })
    .to(sectionFrom, 1.2, { x: '100%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
    .to(sectionTo, 1.2, { x: '0%', ease: Power4.easeInOut }, '0')
    .to(bcgFrom, 1.2, { x: '-30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
    .from(bcg, 1.2, { x: '30%', ease: Power4.easeInOut, clearProps: 'all' }, '0')
    .to(sectionTo, 0.5, { scale: 1 }, '-=0.4')
    .from(heading, 0.7, { autoAlpha: 0, x: '+=40', ease: Power4.easeInOut }, '-=0.7')
    .from(subheading, 0.7, { autoAlpha: 0, x: '+=40', ease: Power4.easeInOut }, '-=0.5')
    .set(body, { className: '-=is-animating' })
  }
};

export const setActiveSection = (sectionFrom, sectionTo) => {

  // Add active class to the current slide
  sectionFrom.classList.remove('active');
  sectionTo.classList.add('active');

  // Add body class highlighting the current slide
  main.body.removeAttribute('class');
  main.body.classList.add(`${sectionTo.id}-active`);

  // Highlight the current slide in the navigation
  const currentSlideIndex = parseInt(sectionTo.id.slice(-2)) - 1;
  for (const [index, li] of Object.entries(main.navLi)) {
    li.removeAttribute('class');
    if (Number(index) === currentSlideIndex) {
      li.classList.add('active');
    }
  }
}