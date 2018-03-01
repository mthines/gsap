// Utilities
import * as util from './common.js';
import { TimelineLite } from "gsap";

// Variables
export const sectionFrom = null,
  slide = document.querySelector('.slide'),
  slideActive = document.querySelector('.slide.active'),
  navLink = document.querySelectorAll('.nav a'),
  navLi = document.querySelectorAll('.nav li'),
  body = document.querySelector('body');


// Initializer
util.init();

navLink.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    // Make it not possible to changes slide when changing slides
    if (body.classList.contains('is-animating')) {
      return;
    }

    const sectionFrom = document.querySelector('.slide.active'),
      sectionToID = e.target.getAttribute('href'),
      sectionTo = document.querySelector(`div${sectionToID}`);

    if (sectionFrom.id !== sectionTo.id) {
      util.scrollToSection(sectionFrom, sectionTo);
    }
  });
})
