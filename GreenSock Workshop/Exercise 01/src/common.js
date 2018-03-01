import * as tl from './main.js';

// Utilities functions
// Update the class
export const updateClass = (projectClass) => {
  document.querySelector('body').classList.add(projectClass);
};

// Pause the Project
export const pauseProjects = (projectClass, tlProjectLoader) => {

  tl.tlProjects.pause();

  if (projectClass !== 'project00') {
    tlProjectLoader.seek(0);
    tlProjectLoader.play();
  }
};

// Pause the Project
export const resumeProjects = () => {
  tl.tlProjects.resume();
};

// Resume the Project
document.querySelector('.project00 .button').addEventListener('click', (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }

  resumeProjects();
});
