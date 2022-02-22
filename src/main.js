import { carouselGridMovement, carouselHorizontalMovement, carouselOK, focusNextCarousel, focusElement, closeCarousel } from './navigation';

// Global variables for index
window.actualHorizontal = 0;
window.actualVertical = 1;

// Global variables for type of carousel
window.isInNormalCarousel = true;
window.isInGridCarousel = false;

// Global variables for grid carousels
window.actualGridRow = 0;
window.actualGridCell = 0;

// Global variables for avoiding a carousel between elements
window.childrenBetweenUp = false;
window.childrenBetweenDown = false;
window.childrenBetweenLeft = false;
window.childrenBetweenRight = false;

// Go back button
window.goBack = 8;

/**
 * Initializing navigation and arrows key codes
 * 
 * Focus next element based on the type of carousel (grid or normal)
 * Focus next element based on the children between global variables value
 */
const init = () => {
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37: //LEFT arrow
        if (window.isInGridCarousel) {
          carouselGridMovement('left');
        } else if (window.childrenBetweenLeft) {
          window.actualVertical -= 1;
          focusNextCarousel('left');
          window.childrenBetweenLeft = false;
        } else if (window.isInNormalCarousel) {
          carouselHorizontalMovement();
        }
        break;
      case 39: //RIGHT arrow
        if (window.isInGridCarousel) {
          carouselGridMovement('right');
        } else if (window.childrenBetweenRight) {
          window.actualVertical += 1;
          focusNextCarousel('right');
          window.childrenBetweenRight = false;
        } else if (window.isInNormalCarousel) {
          carouselHorizontalMovement();
        }
        break;
      case 38: //UP arrow
        if (window.isInGridCarousel) {
          carouselGridMovement('up');
        } else if (window.childrenBetweenUp) {
          window.actualVertical -= 1;
          focusNextCarousel('up');
          window.childrenBetweenUp = false;
        } else if (window.isInNormalCarousel) {
          focusNextCarousel('up');
        }
        break;
      case 40: //DOWN arrow
        if (window.isInGridCarousel) {
          carouselGridMovement('down');
        } else if (window.childrenBetweenDown) {
          window.actualVertical += 1;
          focusNextCarousel('down');
          window.childrenBetweenDown = false;
        } else if (window.isInNormalCarousel) {
          focusNextCarousel('down');
        }
        break;
      case 13: //OK button
        carouselOK();
        break;
      case window.goBack: // GO BACK button
        // Close any closable carousel
        if (closeCarousel()) {
        } 
        // Else; go to last page
        else {
          window.history.back();
        }
        // Focus element based on the indexes
        focusElement();
        break;
      default:
        break;
    }
  });
};

export { init };
