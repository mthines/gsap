// Utilities
import * as tl from './timelines.js';
import { TimelineMax } from "gsap";

// Timelines
export const mainTl = new TimelineMax;

// Variables
export const coin = document.querySelector('#Coin'),
  h1 = document.querySelector('h1'),
  coinPath = [{ x: -90, y: 120 }, { x: -45, y: -150 }, { x: 0, y: 120 }],
  body = document.querySelector('body'),
  Petr = document.querySelector('#Petr'),
  PetrSmile = document.querySelector('#smile'),
  bulbIdea = document.querySelector('#BulbIdea'),
  bulbIdeaLight = document.querySelector('#MainBulb2'),
  part1 = document.querySelector('#Part1'),
  mainBulb = document.querySelector('#MainBulb'),
  liquids = document.querySelectorAll('.liquid'),
  liquid01 = document.querySelector('#Liquid1'),
  liquid02 = document.querySelector('#Liquid2'),
  liquid03 = document.querySelector('#Liquid3'),
  liquid04 = document.querySelector('#Liqui d4'),
  liquid05 = document.querySelector('#Liquid5'),
  liquid06 = document.querySelector('#Liquid6'),
  liquid07 = document.querySelector('#Liquid7'),
  liquid08 = document.querySelector('#Liquid8'),
  liquid09 = document.querySelector('#Liquid9'),
  liquidInsideMask1 = document.querySelector('#LiquidInside1Mask'),
  liquidInsideMask2 = document.querySelector('#LiquidInside2Mask'),
  liquidInsideMask3 = document.querySelector('#LiquidInside3Mask'),
  liquidInsideMask4 = document.querySelector('#LiquidInside4Mask'),
  liquidInsideMask5 = document.querySelector('#LiquidInside5Mask'),
  liquidInsideMask6 = document.querySelector('#LiquidInside6Mask'),
  liquidInsideMask7 = document.querySelector('#LiquidInside7Mask'),
  bulb1 = document.querySelector('#Bulb1 .bulb'),
  bulb2 = document.querySelector('#Bulb2 .bulb'),
  bulb3 = document.querySelector('#Bulb3 .bulb'),
  meterBcg = document.querySelector('#meterBcg'),
  meterStroke = document.querySelector('#meterStroke'),
  part2light = document.querySelector('#Part2 .light'),
  part2lightLeft = document.querySelector('#Part2 .light-left'),
  part2lightMid = document.querySelector('#Part2 .light-mid'),
  part2lightRight = document.querySelector('#Part2 .light-right'),
  printerLightsTop = document.querySelector('#PrinterLightTop, #PrinterLightTop_2_'),
  printerLightsBottom = document.querySelector('#PrinterLightBottom, #PrinterLightBottom_1_'),
  mainLight = document.querySelector('#MainLight'),
  paper = document.querySelector('#Paper'),
  slider = document.querySelector('#slider'),
  stage = document.querySelector('#stage'),
  mainMask = document.querySelector('#MainMask');

// Initializer
tl.init();
