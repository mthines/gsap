import { TweenMax } from 'gsap';
import ScrollMagic from "scrollmagic";
import "animation.gsap"; // Added as alias in webpack conf
import "debug.addIndicators"; // Added as alias in webpack conf

// Initialize Controller
const controller = new ScrollMagic.Controller();

// Variables
export const part1 = document.querySelector('.part1'),
  part2 = document.querySelector('.part2'),
  part3 = document.querySelector('.part3'),
  part4 = document.querySelector('.part4'),
  part5 = document.querySelector('.part5'),
  part6 = document.querySelector('.part6'),
  parts = document.querySelectorAll('.parts li');

// Resetting
TweenMax.set(part3, { y: -572 });
TweenMax.set(part4, { y: -557 });
TweenMax.set(part5, { y: -726 });
TweenMax.set(part6, { y: -846 });
//TweenMax.set(['.parts h2, .parts p'], { autoAlpha: 0 })

const bodyToStart = new TweenMax.to(part3, 1, { y: 0, ease: Linear.easeNone });
const bodyToStartScene = new ScrollMagic.Scene({
  triggerElement: part1,
  triggerHook: 0.6,
  offset: -100,
  duration: 572,
})
.setTween(bodyToStart)
.addTo(controller);

const p4ToBottom = new TweenMax.to(part4, 1, { y: 0, ease: Linear.easeNone });
const p4ToBottomScene = new ScrollMagic.Scene({
  triggerElement: part1,
  triggerHook: 0.1,
  offset: 150,
  duration: 557,
})
.setTween(p4ToBottom)
.addTo(controller);

const p5ToBottom = new TweenMax.to(part5, 1, { y: 0, ease: Linear.easeNone });
const p5ToBottomScene = new ScrollMagic.Scene({
  triggerElement: part1,
  triggerHook: 0.1,
  offset: 150,
  duration: 726,
})
.setTween(p5ToBottom)
.addTo(controller);

const p6ToBottom = new TweenMax.to(part6, 1, { y: 0, ease: Linear.easeNone });
const p6ToBottomScene = new ScrollMagic.Scene({
  triggerElement: part1,
  triggerHook: 0.1,
  offset: 150,
  duration: 846,
})
.setTween(p6ToBottom)
.addTo(controller);

// Loop through all the parts
parts.forEach((element) => {
  const scene = new ScrollMagic.Scene({
    triggerElement: element,
    triggerHook: 0.55,
  })
  .setClassToggle(element, 'fade-in')
  .addTo(controller);
})