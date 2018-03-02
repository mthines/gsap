// Utilities
import * as tl from "./timelines.js";
import ScrollMagic from "scrollmagic/scrollmagic/uncompressed/ScrollMagic";

const controller = new ScrollMagic.Controller();

const pinScene01 = new ScrollMagic.Scene({
  triggerElement: "#slide01",
  triggerHook: 0,
  duration: "100%"
}).setPin("#slide01 .pin-wrapper")
  .addTo(controller);

const pinScene02 = new ScrollMagic.Scene({
  triggerElement: "#slide01",
  triggerHook: 0,
  duration: "200%"
}).setPin("#slide02 .pin-wrapper")
  .addTo(controller);

const pinScene03 = new ScrollMagic.Scene({
  triggerElement: "#slide02",
  triggerHook: 0,
  duration: "200%"
}).setPin("#slide03 .pin-wrapper")
  .addTo(controller);

const pinScene04 = new ScrollMagic.Scene({
  triggerElement: "#slide03",
  triggerHook: 0,
  duration: "100%"
}).setPin("#slide04 .pin-wrapper")
  .addTo(controller);
