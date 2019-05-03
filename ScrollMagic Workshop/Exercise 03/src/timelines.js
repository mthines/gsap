import * as main from './main.js';
import { TimelineMax } from 'gsap';

const getOutroTl = () => {
  const getOutroTl = new TimelineMax();

  return getOutroTl;
}


export const init = () => {
  main.mainTl
      .add(getOutroTl(), 'scene-outro')

  //main.mainTl.seek('scene-outro+=3')
}
