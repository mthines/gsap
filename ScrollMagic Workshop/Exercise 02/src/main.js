// Utilities
import ScrollMagic from "scrollmagic/scrollmagic/uncompressed/ScrollMagic";

const controller = new ScrollMagic.Controller();

const pinScene01 = new ScrollMagic.Scene({
  triggerElement: "#slide01",
  triggerHook: 0,
  duration: "100%"
}).setPin("#slide01 .pin-wrapper")
  .addTo(controller);
