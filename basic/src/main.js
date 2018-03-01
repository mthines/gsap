// Utilities
//import * as util from './common.js';
import { TimelineLite } from "gsap";

// Component
const circle1  = document.querySelector('.circle--1'),
      circle2  = document.querySelector('.circle--2'),
      timeline = new TimelineLite();

const onStart = () => {
  console.log('Animation Started');
};

let i = 0;
const onUpdate = () => {
  console.log(`${i++} Animation is Running`);
};

const onComplete = () => {
  console.log('Animation Completed');
};

timeline
.to(circle1, 0.5, { x: '100%', y: '100%', ease: Power1.bounce, delay: 1 })
.to(circle1, 0.5, { x: '50%', y: '50%', ease: Power1.bounce }, '-=0.15')
.to(circle2, 0.5, { x: '-100%', y: '100%', ease: Power1.bounce, onStart: onStart }, '-=0.15')
.to(circle1, 0.5, { x: '150%', y: '150%', ease: Power1.bounce, onUpdate: onUpdate }, '-=0.15')
.to(circle2, 0.5, { x: '150%', y: '150%', ease: Power1.bounce }, '-=0.15')
.to(circle1, 0.5, { x: '20%', y: '130%', ease: Power1.bounce, onComplete: onComplete }, '-=0.15')
.to(circle2, 0.5, { x: '20%', y: '140%', ease: Power1.bounce }, '-=0.15')
.to(circle1, 0.5, { x: '250%', y: '250%', ease: Power1.bounce }, '-=0.15')
.to(circle2, 0.5, { x: '150%', y: '150%', ease: Power1.bounce }, '-=0.15')
.to(circle1, 0.5, { x: '0%', y: '0%', ease: Power1.bounce }, '-=0.15')
.to(circle2, 0.5, { x: '0%', y: '0%', ease: Power1.bounce }, '-=0.15');

