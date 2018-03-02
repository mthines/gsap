import * as main from './main.js';
import { TimelineMax } from 'gsap';
import 'gsap/TextPlugin';
import 'gsap/BezierPlugin';
import { colorGreen, colorOrange, paper, part2light, pointer } from "./main";

const clearStage = () => {
  const {
    Petr, mainMask, coin, mainBulb, liquids, stage, liquidInsideMask1, liquidInsideMask2, liquidInsideMask3,
    liquidInsideMask4, liquidInsideMask5, liquidInsideMask6, liquidInsideMask7, pointer, paper, slider
  } = main;
  const clearTl = new TimelineMax();

  clearTl
  .set(coin, { scale: 0.5, transformOrigin: 'center center', x: '-88', y: '120' })
  .set(Petr, { autoAlpha: 1, x: '1400%', scale: 2.5, transformOrigin: 'bottom center' })
  .set(mainBulb, { fill: main.colorWhite })
  .set(liquids, { stroke: main.colorWhite })
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
  .set(pointer, { rotation: -60, y: '-=6', x: '+=4', transformOrigin: 'bottom center' })
  .set(paper, { y: '+=55' })
  .set(slider, { x: '-=22' })

  return clearTl;
}

const getIntroTl = () => {
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

const getIdeatTl = () => {
  const { bulbIdea, bulbIdeaLight, part1, h1, coin, coinPath } = main;
  const ideaTl = new TimelineMax();

  ideaTl
  .set(bulbIdea, { autoAlpha: 1, immediateRender: false })
  .from(bulbIdea, 0.5, { y: '+=40px', ease: Bounce.easeOut })
  .set(h1, { text: "You have a cool idea, right?" })
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut })
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '+=2')
  .fromTo(bulbIdeaLight, 0.25, { fill: main.colorWhite }, { fill: main.colorGreen, repeat: 4, yoyo: true })
  .fromTo(bulbIdeaLight, 0.12, { fill: main.colorWhite }, { fill: '#F8876E', repeat: 5, yoyo: true })
  .fromTo(bulbIdeaLight, 0.6, { fill: main.colorWhite }, { fill: '#F8AD43' })
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
  .set(coin, { autoAlpha: 0 })
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut }, '-=5.5')
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '-=3.5')
  .set(h1, { text: "Let GreenSock do the rest!" }, '-=3.3')
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut }, '-=3.2')
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '-=1.2')
  .to(part1, 0.06, { rotation: 5, y: 5, x: 3, transformOrigin: 'bottom right', repeat: 3, yoyo: true })
  .to(part1, 0.06, { rotation: 4, y: 3, x: 2, transformOrigin: 'bottom right', repeat: 3, yoyo: true })
  .add('coin-down')

  return ideaTl;
}

const getPart2Tl = () => {
  const { pointer, part2light, meterBcg, meterStroke, slider, bulb1, bulb2, bulb3 } = main;
  const part2Tl = new TimelineMax();

  part2Tl
  .add('part2-lights')
  .to(pointer, 2, { rotation: 20, y: '+=2px', x: '-=4px' })
  .staggerTo(part2light, 0.1, { fill: main.colorGreen }, 0.1, 'part2-lights')
  .staggerTo(part2light, 0.1, { fill: main.colorRed }, 0.1, 'part2-lights+=0.5')
  .staggerTo(part2light, 0.1, { fill: main.colorOrange }, 0.1, 'part2-lights+=1')
  .to(meterBcg, 0.2, { fill: main.colorGreenMedium }, 'part2-lights+=1.2')
  .to(meterStroke, 0.2, { stroke: main.colorGreenDark }, 'part2-lights+=1.2')
  .to(slider, 1.2, { x: '+=30px', ease: Power4.easeInOut }, 'part2-lights+=1.4')
  .to(bulb1, 0.2, { fill: main.colorGreen, ease: Power4.easeInOut }, 'part2-lights+=2.6')
  .to(bulb2, 0.2, { fill: main.colorRed, ease: Power4.easeInOut }, 'part2-lights+=3')
  .to(bulb3, 0.2, { fill: main.colorOrange, ease: Power4.easeInOut }, 'part2-lights+=3.4')

  return part2Tl;
}

const getFilledTubesTl = () => {
  const {
    liquids, liquidInsideMask1, liquidInsideMask2, liquidInsideMask3, liquidInsideMask4, liquidInsideMask5,
    liquidInsideMask6, liquidInsideMask7, liquid01, liquid02, liquid03, liquid04, liquid05, liquid06, liquid07,
    liquid08, liquid09, liquidInside1, liquidInside2, liquidInside3, liquidInside4, liquidInside5, liquidInside6,
    liquidInside7, h1
  } = main;
  const getFilledTubesTl = new TimelineMax();

  // Resets All the Liquids to Invisible
  // Getting liquid.getTotalLength() and map the height in the same order as the dom
  const liquidLength = [131, 213, 228, 124, 124, 124, 101, 345, 394];
  liquids.forEach((liquid, index) => {
    TweenMax.set(liquid, { strokeDasharray: liquidLength[index], strokeDashoffset: liquidLength[index] })
  })

  getFilledTubesTl
  .set(liquids, { stroke: '#F8876E' })

  // Liquid
  .to(liquid01, 2, { strokeDashoffset: 0, ease: Power0.easeNone })
  .add('flask01')

  // Adding liquid to tubes
  .set(h1, { text: "Text 1" })
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut })
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '+=2')

  // Liquid
  .to(liquid02, 0.5, { strokeDashoffset: 0, ease: Power0.easeNone }, '-=0.2')
  .add('flask02')

  // Set Text
  .set(h1, { text: "Text 2" })
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut })
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '+=2')

  // Liquid
  .to(liquid03, 0.8, { strokeDashoffset: 0, ease: Power0.easeNone }, 'flask02+=1.1')
  .add('flask03')

  // Liquid
  .to(liquid04, 1.2, { strokeDashoffset: 0, ease: Power3.easeIn }, '-=0.7')
  .to(liquid05, 0.7, { strokeDashoffset: 0, ease: Power0.easeNone })
  .add('dividedTubes')

  // Set Text
  .set(h1, { text: "Text 3" }, 'dividedTubes')
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut }, 'dividedTubes')
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '+=2')

  // Liquid
  .to(liquid06, 0.8, { strokeDashoffset: 0, ease: Power1.easeOut }, 'dividedTubes')
  .add('flask04')

  // Liquid
  .to(liquid07, 2.2, { strokeDashoffset: 0, ease: Power1.easeNone }, 'dividedTubes')
  .add('flask05')

  // Liquid
  .to(liquid08, 2, { strokeDashoffset: 0, ease: Power1.easeInOut }, 'flask05-=0.4')
  .add('flask06')

  // Set Text
  .set(h1, { text: "Text 4" }, 'flask05')
  .to(h1, 0.3, { autoAlpha: 1, ease: Power4.easeInOut }, 'flask05')
  .to(h1, 0.2, { autoAlpha: 0, ease: Power4.easeInOut }, '+=2')

  // Liquid
  .to(liquid09, 1.2, { strokeDashoffset: 0, ease: Power0.easeNone }, 'flask06')
  .add('flask07')

  // Set Text
  .set(h1, { scale: 0.9, autoAlpha: 1, text: "Text 5" })
  .to(h1, 2, {
    scale: 1,
    ease: RoughEase.ease.config({
      template: Power0.easeNone,
      strength: 2,
      points: 50,
      taper: "none",
      randomize: true,
      clamp: false
    })
  })
  .to(h1, 0.2, { scale: 1.1, autoAlpha: 0, ease: Power4.easeNone })
  .add('shakedText')

  // Set Text
  .set(h1, { scale: 0.9, text: "Text 6" })
  .to(h1, 0.3, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '+=0.3')
  .to(h1, 0.2, { autoAlpha: 0, y: '+=10px', ease: Power4.easeInOut }, '+=3')
  .add('textDone')

  // Adding liquid to flasks
  .set(liquidInside2, { attrfill: '#366666' })

  .to(liquidInsideMask1, 6, { attr: { y: 415 }, ease: Power1.easeIn }, 'flask01-=0.8')
  .to(liquidInsideMask2, 3, { attr: { y: 451 }, ease: Power1.easeIn }, 'flask02-=0.8')
  .to(liquidInsideMask3, 3, { attr: { y: 452 }, ease: Power1.easeIn }, 'flask03-=0.8')
  .to(liquidInsideMask4, 12, { attr: { y: 614 }, ease: Power1.easeIn }, 'flask04-=3.6')
  .to(liquidInsideMask5, 5, { attr: { y: 563 }, ease: Power1.easeIn }, 'shakedText+=0.2')
  .to(liquidInsideMask6, 3, { attr: { y: 608 }, ease: Power1.easeIn }, 'flask06-=0.8')
  .to(liquidInsideMask7, 2, { attr: { y: 608 }, ease: Power1.easeIn }, 'flask07-=0.8')

  return getFilledTubesTl;
}

const getOutroTl = () => {
  const { mainBulb, paper, h1, printerLightsTop, printerLightsBottom } = main;
  const getOutroTl = new TimelineMax();
  getOutroTl
  .fromTo(mainBulb, 0.4, { fill: main.colorMediumGrey }, { fill: '#dee2e6', repeat: 3, yoyo: true })
  .fromTo(mainBulb, 0.1, { fill: main.colorMediumGrey }, { fill: '#e7eef5', repeat: 5, yoyo: true })
  .fromTo(mainBulb, 1.5, { fill: main.colorWhite }, { fill: '#F8AD43', ease: Power4.easeIn })
  .to(paper, 2, {
    y: '-=55px',
    ease: RoughEase.ease.config({
      template: Power0.easeInOut,
      strength: 0.1,
      points: 20,
      taper: "none",
      randomize: false,
      clamp: false
    })
  })
  .add('paper-out')
  // Set Text
  .set(h1, { scale: 0.8, text: "Thanks for watching my animation" }, '-=0.5')
  .to(h1, 2, { scale: 1, autoAlpha: 1, ease: Power4.easeInOut }, '-=0.5')
  .fromTo(printerLightsTop, 0.1,
    {
      fill: main.colorDarkGrey
    },
    {
      fill: main.colorOrange,
      ease: Power4.easeInOut,
      repeat: 12,
      yoyo: true
    }, 'paper-out-=0.8')
  .fromTo(printerLightsBottom, 0.1,
    {
      fill: main.colorDarkGrey
    },
    {
      fill: main.colorGreen,
      ease: Power4.easeInOut,
      repeat: 10,
      yoyo: true
    }, 'paper-out-=0.7')
  .to([printerLightsTop, printerLightsBottom], 1, { fill: main.colorWhite, ease: Power1.easeInOut }, '-=0.5')

  return getOutroTl;
}


export const init = () => {
  main.mainTl
      .add(clearStage())
      .add(getIntroTl(), 'scene-intro')
      .add(getIdeatTl(), 'scene-idea')
      .add(getPart2Tl(), 'scene-part2')
      .add(getFilledTubesTl(), 'scene-fill-tubes')
      .add(getOutroTl(), 'scene-outro')

  main.mainTl.seek('scene-outro+=3')
}
