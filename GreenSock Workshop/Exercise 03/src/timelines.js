import * as main from './main.js';
import { TimelineMax } from 'gsap';
import 'gsap/TextPlugin';
import 'gsap/BezierPlugin';

export const clearStage = () => {
  const {
    Petr, mainMask, coin, mainBulb, liquids, stage, liquidInsideMask1, liquidInsideMask2, liquidInsideMask3,
    liquidInsideMask4, liquidInsideMask5, liquidInsideMask6, liquidInsideMask7, meterStroke, paper, slider
  } = main;
  const clearTl = new TimelineMax();


  clearTl
  .set(coin, { scale: 0.5, transformOrigin: 'center center', x: '-88', y: '120' })
  .set(Petr, { autoAlpha: 1, x: '1400%', scale: 2.5, transformOrigin: 'bottom center' })
  .set(mainBulb, { fill: '#ffffff' })
  .set(liquids, { stroke: '#ffffff' })
  .set(stage, { autoAlpha: 0.5 })
  .set(mainMask, { attr: { x: 932 } })
  // Clear Liquid
  .set(liquidInsideMask1, { attr: { y: 492 } })
  .set(liquidInsideMask2, { attr: { y: 494 } })
  .set(liquidInsideMask3, { attr: { y: 491 } })
  .set(liquidInsideMask4, { attr: { y: 650 } })
  .set(liquidInsideMask5, { attr: { y: 654 } })
  .set(liquidInsideMask6, { attr: { y: 651 } })
  .set(liquidInsideMask7, { attr: { y: 651 } })
  .set(meterStroke, { rotation: -60, y: '-=5', x: '+=3', transformOrigin: 'bottom center' })
  .set(paper, { y: '+=55' })
  .set(slider, { x: '-=22' })

  return clearTl;
}

export const getIntroTl = () => {
  const { h1, Petr, PetrSmile, mainMask, body, stage } = main;
  const introTl = new TimelineMax();

  introTl
  .set(h1, { y: '-=40px' })
  .to(Petr, 0.8, { x: '1000%', ease: Power4.easeInOut })
  .fromTo(h1, 0.5, { x: '-46%', autoAlpha: 0 }, { x: '-50%', autoAlpha: 1 })
  .fromTo(PetrSmile, 0.6,
    {
      scale: 0.5,
      transformOrigin: 'center center'
    },
    {
      scale: 1,
      ease: Power4.easeInOut
    },
    '+=0.5')
  .add('zoom-out')
  .to(Petr, 1, { x: '0%', scale: 1, ease: Power4.easeInOut }, 'zoom-out+=1')
  .to(h1, 0.5, { autoAlpha: 0 }, 'zoom-out+=1')
  .to(mainMask, 1, { attr: { x: 131 }, ease: Power4.easeInOut }, 'zoom-out+=1')
  .set(body, { className: '+=is-active' }, 'zoom-out+=1')
  .set(h1, { text: 'and this is my GreenSock Lab!', y: '-=60px' })
  .add('text-in')
  .to(h1, 0.3, { y: '+=10px', autoAlpha: 1, ease: Power4.easeInOut }, 'text-in')
  .to(h1, 0.2, { y: '+=5px', autoAlpha: 0, ease: Power4.easeInOut }, '+=2.5')
  .set(h1, { y: '-=15px', text: "Let's have some fun..." })
  .to(h1, 0.3, { y: '+=10px', autoAlpha: 1, ease: Power4.easeInOut })
  .to(h1, 0.2, { y: '+=5px', autoAlpha: 0, ease: Power4.easeInOut }, '+=2')
  .to(stage, 0.2, { autoAlpha: 1, ease: Power0.none }, '-=0.2')

  introTl.seek('text-in');

  return introTl;
}

export const getIdeatTl = () => {
  const { bulbIdea, bulbIdeaLight, part1, h1, coin, coinPath } = main;
  const ideaTl = new TimelineMax();

  ideaTl
  .set(bulbIdea, { autoAlpha: 1, immediateRender: false })
  .from(bulbIdea, 0.5, { y: '+=40px', ease: Bounce.easeOut })
  .set(h1, { text: "You have a cool idea, right?" })
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut })
  .to(h1, 0.3, { autoAlpha: 0, ease: Power4.easeInOut }, '+=2')
  .fromTo(bulbIdeaLight, 0.25, { fill: '#ffffff' }, { fill: '#73C996', repeat: 4, yoyo: true })
  .fromTo(bulbIdeaLight, 0.12, { fill: '#ffffff' }, { fill: '#F8876E', repeat: 5, yoyo: true })
  .fromTo(bulbIdeaLight, 0.6, { fill: '#ffffff' }, { fill: '#F8AD43' })
  .to(bulbIdea, 0.6, { y: '-=20px', scale: 1.1, transformOrigin: 'center bottom', ease: Power4.easeOut })
  .to(bulbIdea, 0.2, { y: '+=120px', scale: 0.8, ease: Power4.easeOut })

  .add('bulb-out')

  .set(coin, { autoAlpha: 1 }, '+=0.3')
  .to(coin, 5,
    {
      rotation: 720,
      bezier: {
        curviness: 0.3,
        values: coinPath
      },
      ease: SlowMo.ease.config(0.1, 0.7, false)
    })


  return ideaTl;
}

export const init = () => {
  main.mainTl
      .add(clearStage())
      .add(getIntroTl(), 'scene-intro')
      .add(getIdeatTl(), 'scene-idea');

  main.mainTl.seek('scene-idea+=5')
}
